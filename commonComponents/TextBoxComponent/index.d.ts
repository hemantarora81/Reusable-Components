import { default as React } from 'react';

interface TextBoxComponentProps {
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
    name?: string;
    value?: string;
    error?: string;
    readOnly?: boolean;
    disabled?: boolean;
    enabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
    pattern?: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    onInputChange?: (e: Event) => void;
    onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    id?: string;
    max?: number;
    type?: string;
    autoFocus?: boolean;
    divStyle?: React.CSSProperties;
    focus?: () => void;
}
declare const TextBoxComponent: React.ForwardRefExoticComponent<TextBoxComponentProps & React.RefAttributes<HTMLInputElement>>;
export default TextBoxComponent;
