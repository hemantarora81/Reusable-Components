import { default as React } from 'react';

type TextAlign = 'left' | 'center' | 'right';
type FilterType = 'multiSelect' | 'text' | 'none';
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
    Cell?: React.ReactNode | ((props: {
        row: D;
        value: any;
    }) => React.ReactNode);
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
declare const GridTableComponent: <D extends object = {}>({ data, columns, loading, columnChooser, reorderable, filterable, sortable, resizable, pagination, gridLines, pageSize, currentPage, totalCount, onPageChange, onPageSizeChange, extraClass, columnChooserRef, rowClassName, emptyState, virtualized, virtualScrollHeight, virtualRowHeight, darkMode, }: GridTableProps<D>, ref: React.Ref<GridTableRef>) => import("react/jsx-runtime").JSX.Element;
export type { Column, GridTableRef };
export default GridTableComponent;
