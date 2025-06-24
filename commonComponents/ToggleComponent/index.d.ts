import { default as React } from 'react';

interface ToggleButtonComponentProps {
    isOn: boolean;
    onToggle: (value: boolean) => void;
    labelLeft?: string;
    labelRight?: string;
    className?: string;
}
declare const ToggleButtonComponent: React.FC<ToggleButtonComponentProps>;
export default ToggleButtonComponent;
