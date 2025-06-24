import { default as React } from 'react';

interface CheckboxComponentProps {
    label: string;
    checked: boolean;
    onChange: (checked: boolean) => void;
    name?: string;
    id?: string;
    disabled?: boolean;
    className?: string;
}
declare const CheckboxComponent: React.FC<CheckboxComponentProps>;
export default CheckboxComponent;
