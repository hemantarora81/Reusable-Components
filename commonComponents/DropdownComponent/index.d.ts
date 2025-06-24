import { default as React, CSSProperties } from 'react';

interface DropdownOption {
    value: string | number;
    text: string;
}
interface FloatingDropdownProps {
    options: DropdownOption[];
    value: string | number;
    onChange: (event: {
        target: {
            value: any;
            name?: string;
        };
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
declare const DropdownComponent: React.ForwardRefExoticComponent<FloatingDropdownProps & React.RefAttributes<HTMLSelectElement>>;
export default DropdownComponent;
