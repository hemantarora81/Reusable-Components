import React from "react";

interface CheckboxComponentProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  name?: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}

const CheckboxComponent: React.FC<CheckboxComponentProps> = ({
  label,
  checked,
  onChange,
  name,
  id,
  disabled = false,
  className = "",
}) => {
  return (
    <label
      htmlFor={id}
      className={`flex items-center gap-2 cursor-pointer select-none text-sm text-gray-800 dark:text-gray-200 ${className}`}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={`
          w-4 size-5 border border-gray-400 rounded-sm cursor-pointer
          appearance-none 
          checked:bg-[#3E2723] 
          checked:border-[#3E2723] 
          checked:after:content-['✔']
          checked:after:text-white
          checked:after:text-xs 
          checked:after:font-bold 
          checked:after:flex 
          checked:after:justify-center 
          checked:after:items-center 
          dark:bg-gray-800 
          transition-all duration-150
        `}
      />
      <span>{label}</span>
    </label>
  );
};

export default CheckboxComponent;
