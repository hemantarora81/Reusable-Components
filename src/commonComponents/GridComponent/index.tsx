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
    gridLines = true,
    pagination = true,
    pageSize: initialPageSize = 15,
    currentPage: initialPage = 1,
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
 const [pageIndex, setPageIndex] = useState(initialPage - 1); // Convert to 0-based index
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [totalPages, setTotalPages] = useState(
    Math.ceil(totalCount / initialPageSize)
  );

  // Update when props change
  useEffect(() => {
    setPageIndex(initialPage - 1);
    setPageSize(initialPageSize);
    setTotalPages(Math.ceil(totalCount / initialPageSize));
  }, [initialPage, initialPageSize, totalCount]);

  const handlePageSizeChange = (newSize: any) => {
    const newPageSize = Number(newSize);
    setPageSize(newPageSize);
    setTotalPages(Math.ceil(totalCount / newPageSize));
    if (onPageSizeChange) {
      onPageSizeChange(newPageSize);
    }
    // Reset to first page when size changes
    setPageIndex(0);
    if (onPageChange) {
      onPageChange(1, newPageSize); // Convert back to 1-based for API
    }
  };

  const handlePageChange = (newPage:any) => {
    setPageIndex(newPage);
    if (onPageChange) {
      onPageChange(newPage + 1, pageSize); // Convert back to 1-based for API
    }
  };

  const canPreviousPage = pageIndex > 0;
  const canNextPage = pageIndex < totalPages - 1;

  // Generate visible page numbers
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(0, pageIndex - Math.floor(maxVisiblePages / 2));
    let endPage = startPage + maxVisiblePages - 1;

    if (endPage >= totalPages) {
      endPage = totalPages - 1;
      startPage = Math.max(0, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  // const [columnFilters, setColumnFilters] = useState<Record<string, any[]>>({});
  // Change this at the top of your component where you define state
const [columnFilters, setColumnFilters] = useState<Record<string, any[] | undefined>>({});
const [sortConfig, setSortConfig] = useState<{ columnId: string; direction: SortDirection }>({ columnId: '', direction: null });

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

  // ==================== COLUMN RESIZING ====================
// ==================== COLUMN RESIZING ====================
  const handleResize = useCallback((columnId: string, width: number) => {
    setColumnWidths(prev => ({
      ...prev,
      [columnId]: width
    }));
  }, []);

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

  // Flatten columns for easier processing
  const flattenedColumns = useMemo(() => {
    const flatten = (cols: Column<D>[]): ColumnItem<D>[] => {
      return cols.reduce((acc, col) => {
        if ('columns' in col) {
          return [...acc, ...flatten(col.columns)];
        }
        return [...acc, col as ColumnItem<D>];
      }, [] as ColumnItem<D>[]);
    };
    return flatten(normalizedColumns);
  }, [normalizedColumns]);

  // ==================== COLUMN REORDER ====================
 const {
    columnOrder,
    draggedColumn,
    dropTarget,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
    resetColumnOrder
  } = useColumnReorder({
    initialOrder: flattenedColumns.map(col => col.id!)
  });
// Get ordered columns based on column order
  const orderedColumns = useMemo(() => {
    const columnMap = new Map(flattenedColumns.map(col => [col.id!, col]));
    return columnOrder
      .map(id => columnMap.get(id))
      .filter((col): col is ColumnItem<D> => !!col);
  }, [columnOrder, flattenedColumns]);
// ==================== SORTING ====================
  const handleSort = useCallback((columnId: string) => {
    const column = flattenedColumns.find(col => col.id === columnId);
    if (!column || !column.sortable) return;

    setSortConfig(prev => {
      if (prev.columnId !== columnId) {
        return { columnId, direction: 'asc' };
      }
      
      switch (prev.direction) {
        case 'asc':
          return { columnId, direction: 'desc' };
        case 'desc':
          return { columnId: '', direction: null };
        default:
          return { columnId, direction: 'asc' };
      }
    });
  }, [flattenedColumns]);
 // ==================== FILTERING & SORTING ====================
 // ==================== FILTERING & SORTING ====================
const processedData = useMemo(() => {
  let result = data;

  // Apply filters
  if (Object.keys(columnFilters).length > 0) {
    result = result.filter(row => {
      return Object.entries(columnFilters).every(([columnId, filterValues]) => {
        if (!filterValues || filterValues.length === 0) return true;
        
        const column = flattenedColumns.find(col => col.id === columnId);
        if (!column || !column.accessor) return true;

        // Get the cell value
        const cellValue = typeof column.accessor === 'function'
          ? column.accessor(row)
          : (row as any)[column.accessor];

        // Handle different filter types
        if (column.filter === 'text') {
          // Text filter (partial match)
          return filterValues.some(filterVal => 
            String(cellValue).toLowerCase().includes(String(filterVal).toLowerCase())
          );
        } else {
          // Multi-select filter (exact match)
          return filterValues.includes(cellValue);
        }
      });
    });
  }

  // Apply sorting
  if (sortConfig.columnId && sortConfig.direction) {
    const column = flattenedColumns.find(col => col.id === sortConfig.columnId);
    if (column && column.accessor) {
      result = [...result].sort((a, b) => {
        const aValue = typeof column.accessor === 'function'
          ? column.accessor(a)
          : (a as any)[column.accessor];
        const bValue = typeof column.accessor === 'function'
          ? column.accessor(b)
          : (b as any)[column.accessor];

        // Handle null/undefined values
        if (aValue == null && bValue == null) return 0;
        if (aValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
        if (bValue == null) return sortConfig.direction === 'asc' ? 1 : -1;

        // Compare values
        let comparison = 0;
        if (aValue < bValue) comparison = -1;
        if (aValue > bValue) comparison = 1;

        return sortConfig.direction === 'asc' ? comparison : -comparison;
      });
    }
  }

  return result;
}, [data, columnFilters, sortConfig, flattenedColumns]);

// ==================== PAGINATION ====================
const paginatedData = useMemo(() => {
  if (!pagination) return processedData;
  const start = pageIndex * pageSize;
  const end = start + pageSize;
  return processedData.slice(start, end);
}, [processedData, pageIndex, pageSize, pagination]);
  // ==================== COLUMN RESIZE COMPONENT ====================
  const ColumnResizer = ({ columnId, column }: { columnId: string; column: ColumnItem<D> }) => {
    const { width, isResizing, resizerProps } = useColumnResize({
      minWidth: column.minWidth,
      maxWidth: column.maxWidth,
      defaultWidth: columnWidths[columnId] || column.width || 150,
      onResize: (newWidth) => handleResize(columnId, newWidth)
    });
    useEffect(() => {
      if (width !== (columnWidths[columnId] || column.width || 150)) {
        handleResize(columnId, width);
      }
    }, [width, columnId, column.width, columnWidths, handleResize]);

    return column.resizable ? (
      <div
        className={`absolute top-0 right-0 w-1 h-full cursor-col-resize bg-transparent hover:bg-blue-500 transition-colors z-20 ${isResizing ? 'bg-blue-500' : ''}`}
        {...resizerProps}
        style={{ right: '0px' }}
      />
    ) : null;
  };
const getFilteredDataForColumn = useCallback((targetColumnId: string) => {
  return data.filter(row => {
    return Object.entries(columnFilters).every(([columnId, filterValues]) => {
      if (columnId === targetColumnId) return true;
      
      // If no filter value, include the row
      if (!filterValues || filterValues.length === 0) return true;
      
      const column = flattenedColumns.find(col => col.id === columnId);
      if (!column || !column.accessor) return true;

      // Get the cell value
      const cellValue = typeof column.accessor === 'function'
        ? column.accessor(row)
        : (row as any)[column.accessor];

      // Handle different filter types
      if (column.filter === 'text') {
        return filterValues.some(filterVal => 
          String(cellValue).toLowerCase().includes(String(filterVal).toLowerCase())
        );
      } else {
        return filterValues.includes(cellValue);
      }
    });
  });
}, [data, columnFilters, flattenedColumns]);
// ==================== RENDER FUNCTIONS ====================
 const renderHeaderCell = (column: ColumnItem<D>) => {
    const columnId = column.id!;
    const isDragging = draggedColumn === columnId;
    const isDropTarget = dropTarget === columnId;
    const currentWidth = columnWidths[columnId] || column.width || 150;
    const isSorted = sortConfig.columnId === columnId;
    const sortDirection = isSorted ? sortConfig.direction : null;
    const hasActiveFilter = columnFilters[columnId] && columnFilters[columnId].length > 0;

    // Sort icon component - only shows when sorting is active
    const SortIcon = () => {
      if (!column.sortable || !isSorted) return null;
      
      // Show up arrow for asc, down arrow for desc
      if (sortDirection === 'asc') {
        return (
          <svg className="w-3 h-3 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 12 12">
            <polygon points="6,2 2,8 10,8" />
          </svg>
        );
      } else if (sortDirection === 'desc') {
        return (
          <svg className="w-3 h-3 ml-1 text-blue-500" fill="currentColor" viewBox="0 0 12 12">
            <polygon points="6,10 2,4 10,4" />
          </svg>
        );
      }
      
      return null;
    };

    return (
      <div
        className={`relative border-r last:border-r-0 ${column.headerClassName || ''} ${themeClasses.header} ${isDragging ? 'opacity-50 border-dashed border-blue-500' : ''} ${column.sortable ? 'cursor-pointer hover:text-blue-500' : ''} ${isDropTarget ? 'bg-blue-500 bg-opacity-10' : ''} ${gridLines ? 'border-gray-300 dark:border-gray-700' : ''}`}
        style={{
          width: `${currentWidth}px`,
          minWidth: `${column.minWidth}px`,
          maxWidth: `${column.maxWidth}px`,
          backgroundColor: column.bgColor,
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
        {/* Single Row Header Content */}
        <div className="flex items-center justify-between px-3 py-2 min-h-[40px]">
          {/* Header Title with Sort */}
          <div 
            className={`flex items-center font-semibold truncate`}
            style={{ textAlign: column.headerTextAlign }}
        onClick={() => column.sortable && handleSort(columnId)}

          >
            <span className="truncate">
              {typeof column.Header === 'function' ? column.Header({ column }) : column.Header}
            </span>
            <SortIcon />
          </div>

          {/* Filter Section */}
          <div className="flex items-center ml-2">
            {filterable && column.filter !== 'none' && (
              <div className="ml-1">
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
                currentFilteredData={getFilteredDataForColumn(columnId)}
                allFilters={columnFilters}
                darkMode={darkMode}
              />
              </div>
            )}
          </div>
        </div>

        {/* Column Resizer */}
        <ColumnResizer columnId={columnId} column={column} />
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
        className={`flex items-center border-b ${themeClasses.row} ${rowThemeClass} ${rowClass}`}
      >
        {/* Use orderedColumns instead of normalizedColumns for proper reordering */}
        {orderedColumns.map((column, colIndex) => {
          const currentWidth = columnWidths[column.id!] || column.width || 150;
          return (
            <div
              key={column.id}
              className={`${column.className || ''} ${gridLines ? 'border-r border-gray-200 dark:border-gray-700 last:border-r-0' : ''}`}
              style={{
                width: `${currentWidth}px`,
                minWidth: `${column.minWidth}px`,
                maxWidth: `${column.maxWidth}px`,
                backgroundColor: column.bgColor,
                color: column.textColor
              }}
            >
              {renderRowCell(row, column, rowIndex)}
            </div>
          );
        })}
      </div>
    );
  };

  // ==================== IMPERATIVE HANDLE ====================
  useImperativeHandle(ref, () => ({
    resetColumnOrder,
    resetColumnResizing: () => setColumnWidths({})
  }));

  // ==================== MAIN RENDER ====================
  return (
    <div 
      className={`relative flex flex-col h-full ${themeClasses.tableContainer} ${extraClass}`} 
      ref={tableRef}
    >
      <div className="flex-1 overflow-hidden">
        {/* Header */}
        <div className={`sticky top-0 z-10 flex border-b ${themeClasses.header}`}>
          {orderedColumns.map((column) => (
            <div key={column.id}>
              {renderHeaderCell(column)}
            </div>
          ))}
        </div>

        {/* Body */}
       <div className="flex-1 overflow-auto">
  {loading ? (
    Array.from({ length: 10 }).map((_, i) => (
      <div key={i} className={`flex items-center border-b ${themeClasses.loadingRow}`}>
        {orderedColumns.map((col) => (
          <div 
            key={col.id} 
            className={`h-10 ${themeClasses.loadingCell} border-r last:border-r-0`}
            style={{ width: columnWidths[col.id!] || col.width || 150 }}
          >
            <div className="h-4 mx-2 mt-3 bg-gray-300 rounded animate-pulse dark:bg-gray-600"></div>
          </div>
        ))}
      </div>
    ))
  ) : processedData.length === 0 ? (
    <div className={`flex flex-col items-center justify-center p-8 ${themeClasses.emptyRow}`}>
      <div className="text-center">
        <div className="mb-2 text-lg font-medium">
          {'No records to display'}
        </div>
        
        {/* Show clear filters button if any filters or sorting is active */}
        {(Object.keys(columnFilters).length > 0 || sortConfig.columnId) && (
          <div className="mt-4">
            <p className="mb-3 text-sm text-gray-500 dark:text-gray-400">
              Try clearing filters or sorting to see more results
            </p>
            <button
              onClick={() => {
                // Clear all filters
                setColumnFilters({});
                
                // Clear sorting
                setSortConfig({ columnId: '', direction: null });
              }}
              className="px-4 py-2 text-sm font-medium text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-600"
            >
              Clear All Filters & Sorting
            </button>
          </div>
        )}
      </div>
    </div>
  ) : virtualized ? (
    <CustomVirtualScroll
      items={pagination?paginatedData:processedData}
      itemHeight={virtualRowHeight}
      containerHeight={virtualScrollHeight}
      renderItem={(item, index) => renderRow(item, index)}
      darkMode={darkMode}
    />
  ) : (
    (paginatedData?paginatedData:processedData).map((row, rowIndex) => renderRow(row, rowIndex))
  )}
</div>
 {pagination && (
  <div className="flex items-center justify-between p-4 border-t border-gray-200 dark:border-gray-700">
    <div className="flex items-center space-x-2">
      <button
        onClick={() => handlePageChange(0)}
        disabled={!canPreviousPage || loading}
        className="px-3 py-1 border border-gray-300 rounded-md dark:border-gray-600 disabled:opacity-50"
      >
        {"<<"}
      </button>
      <button
        onClick={() => handlePageChange(pageIndex - 1)}
        disabled={!canPreviousPage || loading}
        className="px-3 py-1 border border-gray-300 rounded-md dark:border-gray-600 disabled:opacity-50"
      >
        {"<"}
      </button>

      {getPageNumbers().map((pageNumber) => (
        <button
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          className={`px-3 py-1 rounded-md ${
            pageIndex === pageNumber
              ? "bg-blue-500 text-white"
              : "border border-gray-300 dark:border-gray-600"
          }`}
          disabled={loading}
        >
          {pageNumber + 1}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(pageIndex + 1)}
        disabled={!canNextPage || loading}
        className="px-3 py-1 border border-gray-300 rounded-md dark:border-gray-600 disabled:opacity-50"
      >
        {">"}
      </button>
      <button
        onClick={() => handlePageChange(totalPages - 1)}
        disabled={!canNextPage || loading}
        className="px-3 py-1 border border-gray-300 rounded-md dark:border-gray-600 disabled:opacity-50"
      >
        {">>"}
      </button>
    </div>

    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <span>Items per page:</span>
        <select
          value={pageSize}
          onChange={(e) => handlePageSizeChange(e.target.value)}
          disabled={loading}
          className="px-2 py-1 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800"
        >
          {[15, 30, 50, 100, 200, 400].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div>
      <span className="text-sm text-gray-600 dark:text-gray-400">
        Showing {pageIndex * pageSize + 1}-
        {Math.min((pageIndex + 1) * pageSize, totalCount)} of {totalCount} items
      </span>
    </div>
  </div>
)}
      </div>
    </div>
  );
};

// Forward ref with proper typing
const GridTable = forwardRef(GridTableComponent) as <D extends object = {}>(
  props: GridTableProps<D> & { ref?: React.Ref<GridTableRef> }
) => React.ReactElement;

export type { Column, GridTableRef };
export default GridTable;