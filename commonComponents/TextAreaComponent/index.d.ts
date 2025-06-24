import { default as React } from 'react';

interface TextAreaComponentProps {
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    placeholder: string;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    name?: string;
    value?: string;
    error?: string;
    readOnly?: boolean;
    disabled?: boolean;
    enabled?: boolean;
    style?: React.CSSProperties;
    className?: string;
}
declare const TextAreaComponent: React.FC<TextAreaComponentProps>;
export default TextAreaComponent;
