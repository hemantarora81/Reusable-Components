import React from "react";

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

const TextAreaComponent: React.FC<TextAreaComponentProps> = ({
  onChange,
  placeholder,
  onBlur,
  name,
  value,
  error,
  readOnly,
  disabled,
  enabled = true,
  style,
  className = "",
}) => {
  const isDisabled = disabled || !enabled;

  return (
    <div className="relative w-full group">
      {/* Floating Label */}
      <label
        htmlFor={name}
        className="absolute z-10 px-1 text-xs font-medium text-gray-500 bg-white -top-2 left-3 dark:text-gray-300 dark:bg-gray-800"
      >
        {placeholder}
      </label>

      {/* Textarea */}
      <textarea
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder="" // prevent built-in placeholder
        readOnly={readOnly}
        disabled={isDisabled}
        rows={1}
        className={`block w-full resize-none border rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${className}`}
        style={style}
      />

      {/* Error */}
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default TextAreaComponent;
