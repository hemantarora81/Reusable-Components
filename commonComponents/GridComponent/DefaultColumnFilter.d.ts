import { default as React } from 'react';

interface DefaultColumnFilterProps {
    column: {
        filterValue?: any[];
        setFilter: (filterValue: any[]) => void;
        preFilteredRows: any[];
        id: string;
        Header: string;
    };
}
declare const DefaultColumnFilter: React.FC<DefaultColumnFilterProps & {
    darkMode?: boolean;
}>;
export default DefaultColumnFilter;
