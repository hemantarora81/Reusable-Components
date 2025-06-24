import { default as React } from 'react';

interface ColumnChooserProps<D extends object = {}> {
    allColumns: Array<Column<D>>;
    onApply: (selectedColumns: string[]) => void;
}
export interface ColumnChooserRef {
    toggle: () => void;
}
declare const _default: React.ForwardRefExoticComponent<ColumnChooserProps<object> & React.RefAttributes<ColumnChooserRef>>;
export default _default;
