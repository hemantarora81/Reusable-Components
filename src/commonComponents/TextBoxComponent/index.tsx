import React, { forwardRef, Ref } from "react";

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

const TextBoxComponent = forwardRef<HTMLInputElement, TextBoxComponentProps>(
  (
    {
      onChange,
      placeholder = "",
      onBlur,
      name,
      value,
      error,
      readOnly,
      disabled,
      enabled = true,
      style,
      className = "",
      pattern,
      inputMode,
      onInputChange = () => {},
      onKeyDown,
      id,
      max,
      type = "text",
      autoFocus,
      divStyle,
      focus,
    },
    ref: Ref<HTMLInputElement>
  ) => {
    const isDisabled = disabled || !enabled;

    return (
      <div className="w-full" style={divStyle}>
        <div className="relative w-full group" style={style}>
          {/* Floating Label */}
          <label
            htmlFor={id || name}
            className="absolute z-10 px-1 text-xs font-medium text-gray-500 bg-white -top-2 left-3 dark:text-gray-300 dark:bg-gray-800"
          >
            {placeholder?.split("*")?.map((part, index, arr) => (
              <React.Fragment key={index}>
                {part}
                {index !== arr.length - 1 && (
                  <span className="text-red-500">*</span>
                )}
              </React.Fragment>
            ))}
          </label>

          {/* Input Box */}
          <input
            ref={ref}
            type={type}
            placeholder=" "
            name={name}
            id={id || name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            onFocus={focus}
            pattern={pattern}
            autoFocus={autoFocus}
            inputMode={inputMode}
            max={max}
            readOnly={readOnly}
            disabled={isDisabled}
            onKeyDown={onKeyDown}
            onInput={(e) => onInputChange(e.nativeEvent)}
            className={`peer block w-full border rounded-md px-3 py-2 text-sm text-gray-900 dark:text-white bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all duration-200 ${className}`}
          />

          {/* Error Message */}
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>
      </div>
    );
  }
);

export default TextBoxComponent;
