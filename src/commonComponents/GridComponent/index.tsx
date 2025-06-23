import React, {
  useState,
  useMemo,
  useCallback,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';
import CustomTooltip from './CustomTooltip';
import useColumnReorder from './useColumnReorder';
import useColumnResize from './useColumnResize';
import DefaultColumnFilter from './DefaultColumnFilter';
import CustomVirtualScroll from './CustomVirtualScroll';

// ==================== TYPES ====================
type TextAlign = 'left' | 'center' | 'right';
type FilterType = 'multiSelect' | 'text' | 'none';
type SortDirection = 'asc' | 'desc' | null;

interface ColumnBase<D extends object = {}> {
  Header: React.ReactNode | ((props: any) => React.ReactNode);
  accessor?: keyof D | string | ((row: D) => any);
  id?: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  headerTextAlign?: TextAlign;
  textAlign?: TextAlign;
  filter?: FilterType;
  isTooltip?: boolean;
  visible?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  className?: string;
  headerClassName?: string;
  cellClassName?: string;
  bgColor?: string;
  textColor?: string;
  darkBgColor?: string;
  darkTextColor?: string;
}

interface ColumnGroup<D extends object = {}> extends ColumnBase<D> {
  columns: Column<D>[];
}

interface ColumnItem<D extends object = {}> extends ColumnBase<D> {
  Cell?: React.ReactNode | ((props: { row: D; value: any }) => React.ReactNode);
}

type Column<D extends object = {}> = ColumnGroup<D> | ColumnItem<D>;

interface GridTableProps<D extends object = {}> {
  data: D[];
  columns: Column<D>[];
  loading?: boolean;
  columnChooser?: boolean;
  reorderable?: boolean;
  filterable?: boolean;
  sortable?: boolean;
  resizable?: boolean;
  pagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  gridLines?: boolean;
  totalCount?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  extraClass?: string;
  columnChooserRef?: React.Ref<any>;
  rowClassName?: string | ((row: D, index: number) => string);
  emptyState?: React.ReactNode;
  virtualized?: boolean;
  virtualScrollHeight?: number;
  virtualRowHeight?: number;
  darkMode?: boolean;
}

interface GridTableRef {
  resetColumnOrder: () => void;
  resetColumnResizing: () => void;
}

// ==================== MAIN COMPONENT ====================
const GridTableComponent = <D extends object = {}>(
  {
    data = [],
    columns,
    loading = false,
    columnChooser = true,
    reorderable = true,
    filterable = true,
    sortable = true,
    resizable = false,
    pagination = true,
    gridLines=true,
    pageSize = 15,
    currentPage = 1,
    totalCount = 0,
    onPageChange,
    onPageSizeChange,
    extraClass = '',
    columnChooserRef,
    rowClassName,
    emptyState,
    virtualized = false,
    virtualScrollHeight = 500,
    virtualRowHeight = 40,
    darkMode = false,
  }: GridTableProps<D>,
  ref: React.Ref<GridTableRef>
) => {
  // ==================== STATE & REFS ====================
  const tableRef = useRef<HTMLDivElement>(null);
  const [pageIndex, setPageIndex] = useState(currentPage - 1);
  const [internalPageSize, setInternalPageSize] = useState(pageSize);
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  // Add filter state
  const [columnFilters, setColumnFilters] = useState<Record<string, any[]>>({});


  // ==================== THEME CLASSES ====================
  const themeClasses = useMemo(() => {
    return darkMode ? {
      tableContainer: 'bg-gray-900 text-gray-100',
      header: 'bg-gray-800 border-gray-700',
      row: 'border-gray-700',
      evenRow: 'bg-gray-800 hover:bg-gray-750',
      oddRow: 'bg-gray-850 hover:bg-gray-800',
      loadingRow: 'bg-gray-800',
      loadingCell: 'bg-gray-700',
      emptyRow: 'text-gray-400',
      resizer: 'hover:bg-blue-400',
      filterButton: 'text-blue-400 hover:bg-gray-700',
      activeFilter: 'bg-blue-900'
    } : {
      tableContainer: 'bg-white text-gray-800',
      header: 'bg-gray-100 border-gray-200',
      row: 'border-gray-200',
      evenRow: 'bg-white hover:bg-gray-50',
      oddRow: 'bg-gray-50 hover:bg-gray-100',
      loadingRow: 'bg-white',
      loadingCell: 'bg-gray-100',
      emptyRow: 'text-gray-500',
      resizer: 'hover:bg-blue-500',
      filterButton: 'text-blue-500 hover:bg-gray-200',
      activeFilter: 'bg-blue-100'
    };
  }, [darkMode]);
  const handleResize = (columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
  };
  // ==================== COLUMN NORMALIZATION ====================
  const normalizedColumns = useMemo(() => {
    const normalizeColumn = (col: Column<D>): Column<D> => {
      const columnId = col.id || (typeof col.accessor === 'string' ? col.accessor : Math.random().toString(36).substring(7));
      const defaultWidth = col.width || 150;
      const currentWidth = columnWidths[columnId] || defaultWidth;

      const base = {
        ...col,
        id: columnId,
        width: currentWidth,
        minWidth: col.minWidth || 50,
        textAlign: col.textAlign || 'left',
        headerTextAlign: col.headerTextAlign || 'center',
        isTooltip: col.isTooltip !== false,
        sortable: col.sortable !== false && sortable,
        filter: col.filter || (filterable ? 'multiSelect' : 'none'),
        resizable: col.resizable || resizable,
        visible: col.visible !== false,
        bgColor: darkMode ? col.darkBgColor || col.bgColor : col.bgColor,
        textColor: darkMode ? col.darkTextColor || col.textColor : col.textColor
      };

      if ('columns' in col) {
        return {
          ...base,
          columns: col.columns.map(normalizeColumn)
        };
      }

      return base;
    };

    return columns.map(normalizeColumn);
  }, [columns, sortable, filterable, resizable, columnWidths, darkMode]);


  // Create filtered data
  const filteredData = useMemo(() => {
    if (Object.keys(columnFilters).length === 0) return data;

    return data.filter(row => {
      return Object.entries(columnFilters).every(([columnId, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        
        const column = normalizedColumns.find(col => col.id === columnId);
        if (!column || !column.accessor) return true;

        // Get the cell value
        const cellValue = typeof column.accessor === 'function'
          ? column.accessor(row)
          : (row as any)[column.accessor];

        // Handle different filter types
        if (column.filter === 'text') {
          // Text filter (partial match)
          return filterValues.some(filterVal => 
            String(cellValue).toLowerCase().includes(String(filterVal).toLowerCase()
          ));
        } else {
          // Multi-select filter (exact match)
          return filterValues.includes(cellValue);
        }
      });
    });
  }, [data, columnFilters, normalizedColumns]);

  // ==================== COLUMN REORDER ====================
  const {
    columnOrder,
    setColumnOrder,
    draggedColumn,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    resetColumnOrder
  } = useColumnReorder({
    initialOrder: normalizedColumns.flatMap(col => 
      'columns' in col 
        ? col.columns.map((subCol: { id: any; }) => subCol.id!) 
        : [col.id!]
    )
  });
  const orderedColumns = useMemo(() => {
  const columnMap = new Map(normalizedColumns.map(col => [col.id!, col]));
  return columnOrder
    .map(id => columnMap.get(id))
    .filter((col): col is ColumnItem<D> => !!col); // filter out undefined
}, [columnOrder, normalizedColumns]);

  // ==================== RENDER FUNCTIONS ====================
const renderHeaderCell = (column: Column<D>) => {
  const isGroupHeader = 'columns' in column;
  const columnId = column.id!;
  const isDragging = draggedColumn === columnId;
  const isDropTarget = dropTarget === columnId;

  const { width, isResizing, resizerProps } = useColumnResize({
    minWidth: column.minWidth,
    maxWidth: column.maxWidth,
    defaultWidth: columnWidths[columnId] || column.width || 150,
    onResize: (newWidth) => handleResize(columnId, newWidth)
  });

  if (isGroupHeader) return null;

  return (
    <div
      className={`relative flex flex-row items-center justify-between ${column.headerClassName || ''} ${isDragging ? 'opacity-50 border-dashed border-blue-500' : ''} ${isDropTarget ? 'bg-blue-500 bg-opacity-10' : ''} {${gridLines ? 'border-gray-300 dark:border-gray-700' : ''}`}
      style={{
        width: `${width}px`,
        minWidth: `${column.minWidth}px`,
        maxWidth: `${column.maxWidth}px`,
        backgroundColor: column.bgColor,
        textAlign: column.headerTextAlign,
      }}
      draggable={reorderable}
      onDragStart={() => handleDragStart(columnId)}
      onDragOver={(e) => {
        e.preventDefault();
        handleDragOver(columnId);
      }}
      onDrop={handleDrop}
      onDragEnd={handleDragEnd}
    >
      <div className="flex items-center justify-between px-3 py-2 font-semibold truncate">
        <span>
          {typeof column.Header === 'function' ? column.Header({ column }) : column.Header}
        </span>
      </div>

      {/* Filters */}
      {filterable && column.filter !== 'none' && (
        <div className="py-2 ">
          <DefaultColumnFilter
            column={{
              filterValue: columnFilters[columnId] || [],
              setFilter: (value) => {
                setColumnFilters(prev => ({
                  ...prev,
                  [columnId]: value && value.length > 0 ? value : undefined
                }));
              },
              preFilteredRows: data,
              id: columnId,
              Header: typeof column.Header === 'string' ? column.Header : columnId,
            }}
            darkMode={darkMode}
          />
        </div>
      )}

      {/* Resizer */}
      {column.resizable && (
        <div
          className={`absolute top-0 right-0 w-1 cursor-col-resize bg-blue-400 opacity-0 hover:opacity-100 transition-opacity`}
          {...resizerProps}
        />
      )}
    </div>
  );
};


  const renderRowCell = (row: D, column: ColumnItem<D>, rowIndex: number) => {
    const value = typeof column.accessor === 'function'
      ? column.accessor(row)
      : column.accessor
        ? (row as any)[column.accessor]
        : null;

    const cellContent = column.Cell
      ? typeof column.Cell === 'function'
        ? column.Cell({ row, value })
        : column.Cell
      : value;

    const cellElement = (
      <div
        className={`px-4 py-2 truncate ${column.cellClassName || ''}`}
        style={{
          textAlign: column.textAlign,
          color: column.textColor
        }}
      >
        {cellContent}
      </div>
    );

    return column.isTooltip ? (
      <CustomTooltip content={value} darkMode={darkMode}>
        {cellElement}
      </CustomTooltip>
    ) : (
      cellElement
    );
  };
  const renderRow = (row: D, rowIndex: number) => {
    const rowClass = typeof rowClassName === 'function'
      ? rowClassName(row, rowIndex)
      : rowClassName || '';
    
    const rowThemeClass = rowIndex % 2 ? themeClasses.oddRow : themeClasses.evenRow;
    
    return (
      <div 
        key={rowIndex} 
        className={`flex items-center border-b ${rowThemeClass} ${rowClass}`}
      >
        {normalizedColumns.map((column, colIndex) => (
          'columns' in column ? null : (
            <div
              key={colIndex}
             className={`${column.className || ''} ${gridLines ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : ''}`}
              style={{
                width: `${column.width}px`,
                minWidth: `${column.minWidth}px`,
                maxWidth: `${column.maxWidth}px`,
                textAlign: column.textAlign,
                backgroundColor: column.bgColor,
                color: column.textColor
              }}
            >
              {renderRowCell(row, column, rowIndex)}
            </div>
          )
        ))}
      </div>
    );
  };
  // ==================== MAIN RENDER ====================
  return (
    <div 
      className={`relative flex flex-col h-full ${themeClasses.tableContainer} ${extraClass}`} 
      ref={tableRef}
    >
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className={`sticky top-0 z-10 flex border-b ${themeClasses.header}`}>
          {orderedColumns.map((column, idx) => (
            <div key={idx}>
              {renderHeaderCell(column)}
            </div>
          ))}
        </div>

        {/* Body */}
        <div className="h-full overflow-auto">
          {loading ? (
            Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className={`flex items-center border-b ${themeClasses.loadingRow}`}>
                {normalizedColumns.map((col, j) => (
                  <div 
                    key={j} 
                    className={`h-10 ${themeClasses.loadingCell}`}
                    style={{ width: col.width }}
                  />
                ))}
              </div>
            ))
          ) : data.length === 0 ? (
            <div className={`flex items-center justify-center p-8 ${themeClasses.emptyRow}`}>
              {emptyState || 'No records to display'}
            </div>
          ) : virtualized ? (
             <CustomVirtualScroll
                items={filteredData}  // Use filteredData instead of data
                itemHeight={virtualRowHeight}
                containerHeight={virtualScrollHeight}
                renderItem={(item, index) => renderRow(item, index)}
                darkMode={darkMode}
                />
          ) : (
             filteredData.map((row, rowIndex) => renderRow(row, rowIndex))
          )}
        </div>
      </div>
    </div>
  );
};

// Forward ref with proper typing
const GridTable = forwardRef(GridTableComponent) as <D extends object = {}>(
  props: GridTableProps<D> & { ref?: React.Ref<GridTableRef> }
) => React.ReactElement;

export type { Column, GridTableRef };
export default GridTableComponent;