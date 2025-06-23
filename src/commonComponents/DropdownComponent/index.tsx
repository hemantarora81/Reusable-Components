import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  CSSProperties,
} from "react";

interface DropdownOption {
  value: string | number;
  text: string;
}

interface FloatingDropdownProps {
  options: DropdownOption[];
  value: string | number;
  onChange: (event: {
    target: { value: any; name?: string };
    value: any;
    itemData?: DropdownOption | null;
    element?: HTMLElement | null;
    originalEvent?: Event | null;
  }) => void;
  name?: string;
  id?: string;
  key?: string;
  popupWidth?: string;
  popHeight?: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  style?: CSSProperties;
  className?: string;
  showClearButton?: boolean;
  showSearch?: boolean;
}

const DropdownComponent = forwardRef<HTMLSelectElement, FloatingDropdownProps>(
  (
    {
      options = [],
      value,
      onChange,
      name,
      id,
      popupWidth,
      popHeight = "auto",
      placeholder = "Select an option",
      error,
      disabled = false,
      style = {},
      className = "",
      showClearButton = false,
      showSearch = false,
    },
    ref
  ) => {
    const hasValue = value !== null && value !== undefined && value !== "";
    const [searchQuery, setSearchQuery] = useState("");
    const [isOpen, setIsOpen] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(-1);
    const selectRef = useRef<HTMLSelectElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const optionsListRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (ref) {
        if (typeof ref === "function") {
          ref(selectRef.current);
        } else {
          (ref as React.MutableRefObject<HTMLSelectElement | null>).current =
            selectRef.current;
        }
      }
    }, [ref]);

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

    const filteredOptions =
      showSearch && searchQuery
        ? options.filter((opt) =>
            opt.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : options;

    const handleChange = (selectedValue: any) => {
      const selectedOption = options.find((opt) => opt.value === selectedValue);
      const eventObject = {
        target: { value: selectedValue, name },
        value: selectedValue,
        itemData: selectedOption,
        element: selectRef.current,
        originalEvent: null,
      };
      onChange(eventObject);
      setIsOpen(false);
      setSearchQuery("");
    };

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange({
        target: { value: "", name },
        value: "",
        itemData: null,
        element: selectRef.current,
        originalEvent: null,
      });
      setSearchQuery("");
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setFocusedIndex(-1);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
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
        setIsOpen((prev) => !prev);
        if (!isOpen) setSearchQuery("");
      }
    };

    return (
      <div
        className="relative w-full max-w-md transition-colors duration-300"
        ref={dropdownRef}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        style={style}
      >
        <select
          className="hidden"
          name={name}
          id={id}
          value={value}
          ref={selectRef}
          onChange={(e) => handleChange(e.target.value)}
        />

        {/* Display box */}
        <div
          className={`border px-4 py-2 rounded-md bg-white dark:bg-gray-800 flex items-center justify-between shadow-sm cursor-pointer transition duration-200 ${
            isOpen ? "ring-2 ring-gray-500" : "border-gray-300"
          } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={toggleDropdown}
        >
          <span className="text-gray-900 truncate dark:text-gray-100">
            {options.find((opt) => opt.value === value)?.text || placeholder}
          </span>

          {/* Clear Button */}
          {showClearButton && hasValue && !disabled && (
            <button
              onClick={handleClear}
              className="ml-2 text-gray-400 hover:text-red-500"
              aria-label="Clear selection"
            >
              &times;
            </button>
          )}

          {/* Dropdown Icon */}
          <span
            className={`ml-2 transition-transform duration-200 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          >
            ▼
          </span>
        </div>

        {/* Options Panel */}
        {isOpen && (
          <div
            className="absolute z-20 w-full mt-2 overflow-auto bg-white border border-gray-200 rounded-md shadow-lg dark:bg-gray-900 dark:border-gray-700 max-h-60 animate-fade-in"
            style={{ width: popupWidth || "100%", height: popHeight }}
            ref={optionsListRef}
          >
            {showSearch && (
              <div className="p-2">
                <input
                  type="text"
                  className="w-full px-3 py-1 text-gray-800 bg-white border border-gray-300 rounded-md dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  autoFocus
                />
              </div>
            )}

            {filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <div
                  key={opt.value}
                  className={`px-4 py-2 text-sm cursor-pointer transition-colors duration-150 rounded mx-2 mb-1 truncate ${
                    value === opt.value
                      ? "bg-blue-100 dark:bg-gray-700 font-semibold"
                      : "hover:bg-blue-50 dark:hover:bg-gray-100 dark:hover:text-gray-700"
                  } ${index === focusedIndex ? "bg-blue-200" : "text-white"}`}
                  onClick={() => handleChange(opt.value)}
                >
                  {opt.text}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-gray-500">No options found</div>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="mt-1 text-sm text-red-600 transition-opacity">
            {error}
          </p>
        )}
      </div>
    );
  }
);

DropdownComponent.displayName = "DropdownComponent";
export default DropdownComponent;
