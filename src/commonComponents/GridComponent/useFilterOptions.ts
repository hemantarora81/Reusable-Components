import { useState, useEffect, useMemo } from 'react';

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

const useFilterOptions = ({
  options,
  filterValue = [],
  columnId,
  preFilteredRows
}: UseFilterOptionsProps): UseFilterOptionsReturn => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc' | null>(null);
  const [selectedValues, setSelectedValues] = useState<any[]>(filterValue);

  // Extract unique options from data if not provided
  const availableOptions = useMemo(() => {
    if (options && options.length > 0) return options;
    
    const optionsMap = new Map();
    preFilteredRows.forEach(row => {
      // Handle both row.values[columnId] and direct row[columnId] access
      const value = row?.values?.[columnId] ?? row?.[columnId]
      if (value !== undefined && value !== null && !optionsMap.has(value)) {
        optionsMap.set(value, value);
      }
    });
    return Array.from(optionsMap.values());
  }, [options, preFilteredRows, columnId]);

  const filteredOptions = useMemo(() => {
    let result = [...availableOptions];

    // Apply search filter
    if (searchTerm) {
      result = result.filter(option =>
        String(option).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply sorting
    if (sortDirection) {
      result.sort((a, b) => {
        if (typeof a === 'number' && typeof b === 'number') {
          return sortDirection === 'asc' ? a - b : b - a;
        }
        return sortDirection === 'asc'
          ? String(a).localeCompare(String(b))
          : String(b).localeCompare(String(a));
      });
    }

    return result;
  }, [availableOptions, searchTerm, sortDirection]);

  const toggleSortDirection = () => {
    setSortDirection(prev => {
      if (prev === 'asc') return 'desc';
      if (prev === 'desc') return null;
      return 'asc';
    });
  };

  // Sync with external filter value changes
  useEffect(() => {
    setSelectedValues(filterValue);
  }, [filterValue]);

  return {
    filteredOptions,
    searchTerm,
    setSearchTerm,
    sortDirection,
    toggleSortDirection,
    selectedValues,
    setSelectedValues
  };
};

export default useFilterOptions;