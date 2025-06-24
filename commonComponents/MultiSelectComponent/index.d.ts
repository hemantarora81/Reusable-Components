interface OptionType {
    value: any;
    text: string;
}
interface MultiSelectDropdownProps {
    options?: OptionType[];
    value: any;
    onChange: (event: {
        target: {
            value: any;
            name?: string;
        };
    }) => void;
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
declare const MultiSelectDropdown: import('react').ForwardRefExoticComponent<MultiSelectDropdownProps & import('react').RefAttributes<HTMLInputElement>>;
export default MultiSelectDropdown;
