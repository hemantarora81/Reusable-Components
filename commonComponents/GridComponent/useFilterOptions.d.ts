interface UseFilterOptionsProps {
    options: any[];
    filterValue?: any[];
    columnId: string;
    preFilteredRows: any[];
}
interface UseFilterOptionsReturn {
    filteredOptions: any[];
    searchTerm: string;
    setSearchTerm: (term: string) => void;
    sortDirection: 'asc' | 'desc' | null;
    toggleSortDirection: () => void;
    selectedValues: any[];
    setSelectedValues: (values: any[]) => void;
}
declare const useFilterOptions: ({ options, filterValue, columnId, preFilteredRows }: UseFilterOptionsProps) => UseFilterOptionsReturn;
export default useFilterOptions;
