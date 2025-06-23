import { useEffect, useRef, useState, forwardRef, ForwardedRef } from "react";
// import './MultiSelect.css'
interface OptionType {
  value: any;
  text: string;
}

interface MultiSelectDropdownProps {
  options?: OptionType[];
  value: any;
  onChange: (event: { target: { value: any; name?: string } }) => void;
  name?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
  showClearButton?: boolean;
  showSearch?: boolean;
  isCheckable?: boolean;
  selectAllText?: string;
  mode?: "default" | "checkbox";
}

const MultiSelectDropdown = forwardRef<HTMLInputElement, MultiSelectDropdownProps>(
  (
    {
      options = [],
      value,
      onChange,
      name,
      placeholder = "",
      error,
      disabled = false,
      style = {},
      className = "",
      showClearButton = false,
      showSearch = false,
      isCheckable = false,
      selectAllText = "Select All",
      mode = "default",
    },
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    const hasValue =
      value !== null &&
      value !== undefined &&
      (mode === "checkbox" ? value.length > 0 : value !== "");
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLInputElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsListRef = useRef<HTMLDivElement>(null);

    const allSelected =
      mode === "checkbox" && value && value.length === options.length;

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    useEffect(() => {
      if (focusedIndex >= 0 && optionsListRef.current) {
        const options = optionsListRef.current.children;
        if (options && options[focusedIndex]) {
          (options[focusedIndex] as HTMLElement).scrollIntoView({
            block: "nearest",
            behavior: "smooth",
          });
        }
      }
    }, [focusedIndex]);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(selectRef.current);
        } else {
          ref.current = selectRef.current;
        }
      }
    }, [ref]);

    const filteredOptions =
      showSearch && searchQuery
        ? options.filter((opt) =>
            opt.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : options;

    const handleChange = (selectedValue: any) => {
      const actualValue =
        typeof selectedValue === "object" ? selectedValue.value : selectedValue;

      if (mode === "checkbox") {
        let newValue = Array.isArray(value) ? [...value] : [];
        if (newValue.includes(actualValue)) {
          newValue = newValue.filter((v) => v !== actualValue);
        } else {
          newValue.push(actualValue);
        }
        onChange({ target: { value: newValue, name } });
      } else {
        onChange({ target: { value: actualValue, name } });
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    const handleSelectAll = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      const newValue = allSelected ? [] : options.map((opt) => opt.value);
      onChange({ target: { value: newValue, name } });
    };

    const handleClear = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      onChange({ target: { value: mode === "checkbox" ? [] : "", name } });
      setSearchQuery("");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setFocusedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex((prev) => (prev + 1) % filteredOptions.length);
          break;
        case "ArrowUp":
          e.preventDefault();
          setIsOpen(true);
          setFocusedIndex((prev) =>
            prev <= 0 ? filteredOptions.length - 1 : prev - 1
          );
          break;
        case "Enter":
          if (isOpen && focusedIndex >= 0) {
            e.preventDefault();
            handleChange(filteredOptions[focusedIndex].value);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setSearchQuery("");
          break;
      }
    };

    const toggleDropdown = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        if (!isOpen) setSearchQuery("");
      }
    };

    const getDisplayText = (): string => {
      if (mode === "checkbox") {
        if (!value || value.length === 0) return "";
        if (value.length === 1) {
          const selectedOption = options.find((opt) => opt.value === value[0]);
          return selectedOption?.text || "";
        }
        return `${value.length} selected`;
      }
      return options.find((opt) => opt.value === value)?.text || "";
    };

    return (
      <div
        className="relative w-full max-w-md transition-colors duration-300"
        ref={dropdownRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={style}
      >
        <div
          className={`border rounded-md px-4 py-2 flex justify-between items-center bg-white dark:bg-gray-800 shadow-sm cursor-pointer transition duration-200 ${
            isOpen ? "ring-2 ring-gray-500" : "border-gray-300"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={toggleDropdown}
          ref={selectRef}
        >
          <span className="text-gray-900 truncate dark:text-gray-100">
            {getDisplayText() || placeholder}
          </span>

          {showClearButton && hasValue && !disabled && (
            <button
              onClick={handleClear}
              className="ml-2 text-gray-400 hover:text-red-500"
              aria-label="Clear selection"
            >
              &times;
            </button>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-20 w-full mt-2 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-900 dark:border-gray-700 max-h-60 animate-fade-in">
            {showSearch && (
              <div className="p-2">
                <input
                  type="text"
                  className={`w-full px-3 py-1 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500`}
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
              </div>
            )}

            {mode === "checkbox" && isCheckable && (
              <div
                className="flex items-center gap-2 px-4 py-2 text-sm cursor-pointer select-none hover:bg-blue-50 dark:hover:bg-gray-700"
                onClick={handleSelectAll}
              >
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={() => {}}
                />
                <span className="text-gray-800 dark:text-gray-200">
                  {selectAllText}
                </span>
              </div>
            )}

            <div ref={optionsListRef}>
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, index) => (
                  <div
                    key={opt.value}
                    className={`flex items-center gap-2 px-4 py-2 cursor-pointer text-sm select-none rounded mx-2 mb-1 truncate transition-colors duration-150 ${
                      mode === "checkbox" && value?.includes(opt.value)
                        ? "bg-blue-100 dark:bg-gray-700 font-semibold"
                        : "hover:bg-blue-50 dark:hover:bg-gray-700"
                    } ${index === focusedIndex ? "bg-blue-200" : ""}`}
                    onClick={() => handleChange(opt.value)}
                  >
                    {mode === "checkbox" && isCheckable && (
                      <input
                        type="checkbox"
                        checked={value?.includes(opt.value)}
                        readOnly
                      />
                    )}
                    <span className="text-gray-900 dark:text-gray-100">
                      {opt.text}
                    </span>
                  </div>
                ))
              ) : (
                <div className="px-4 py-2 text-sm text-gray-500">
                  No options found
                </div>
              )}
            </div>
          </div>
        )}

        {error && (
          <p className="mt-1 text-sm text-red-600 transition-opacity">
            {error}
          </p>
        )}
      </div>
    );
  }
);

MultiSelectDropdown.displayName = "MultiSelectDropdown";
export default MultiSelectDropdown;
