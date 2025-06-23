import React, { useState, useRef, useEffect } from 'react';
import { IoFilter } from 'react-icons/io5';
import useFilterOptions from './useFilterOptions';

interface DefaultColumnFilterProps {
  column: {
    filterValue?: any[];
    setFilter: (filterValue: any[]) => void;
    preFilteredRows: any[];
    id: string;
    Header: string;
  };
}

const DefaultColumnFilter: React.FC<DefaultColumnFilterProps & { darkMode?: boolean }> = ({ 
  column,
  darkMode = false 
}) =>{
  const {
    filterValue = [],
    setFilter,
    preFilteredRows,
    id,
    Header
  } = column;
  
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  
  const {
    filteredOptions,
    searchTerm,
    setSearchTerm,
    sortDirection,
    toggleSortDirection,
    selectedValues,
    setSelectedValues
  } = useFilterOptions({
    options: [],
    filterValue,
    columnId: id,
    preFilteredRows
  });

  const handleApply = () => {
    setFilter(selectedValues.length > 0 ? selectedValues : undefined);
    setIsOpen(false);
  };

  const handleClear = () => {
    setSelectedValues([]);
    setFilter(undefined);
  };

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    if (!isOpen) {
      setSelectedValues(filterValue || []);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
  <div className={`default-column-filter ${darkMode ? 'dark' : ''}`} ref={dropdownRef}>
      <button
        className={`filter-button ${filterValue?.length ? 'active' : ''} ${
          darkMode ? 'text-blue-400 hover:bg-gray-700' : 'text-blue-500 hover:bg-gray-200'
        }`}
        onClick={handleToggle}
        aria-label={`Filter ${column.Header}`}
      >
        <IoFilter />
        {filterValue?.length > 0 && (
          <span className="filter-count">{filterValue.length}</span>
        )}
      </button>

      {isOpen && (
        <div className="filter-dropdown">
          <div className="filter-header">
            <h4>Filter {Header}</h4>
            <button onClick={() => setIsOpen(false)}>×</button>
          </div>

          <div className="filter-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="sort-controls">
              <button
                onClick={() => toggleSortDirection()}
                className={sortDirection === 'asc' ? 'active' : ''}
              >
                Sort A-Z
              </button>
              <button
                onClick={() => toggleSortDirection()}
                className={sortDirection === 'desc' ? 'active' : ''}
              >
                Sort Z-A
              </button>
            </div>
          </div>

          <div className="filter-options">
            <div className="select-all option-item">
              <label>
                <input
                  type="checkbox"
                  checked={selectedValues.length === filteredOptions.length}
                  onChange={(e) => {
                    setSelectedValues(
                      e.target.checked ? [...filteredOptions] : []
                    );
                  }}
                />
                Select All
              </label>
            </div>

            {filteredOptions.map((option, index) => (
              <div key={index} className="option-item">
                <label>
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(option)}
                    onChange={(e) => {
                      const newSelected = e.target.checked
                        ? [...selectedValues, option]
                        : selectedValues.filter(v => v !== option);
                      setSelectedValues(newSelected);
                    }}
                  />
                  {String(option)}
                </label>
              </div>
            ))}
          </div>

          <div className="filter-footer">
            <button onClick={handleClear} className="clear-btn">
              Clear
            </button>
            <button onClick={handleApply} className="apply-btn">
              Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefaultColumnFilter;