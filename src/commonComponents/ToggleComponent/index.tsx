import React from "react";

interface ToggleButtonComponentProps {
  isOn: boolean;
  onToggle: (value: boolean) => void;
  labelLeft?: string;
  labelRight?: string;
  className?: string;
}

const ToggleButtonComponent: React.FC<ToggleButtonComponentProps> = ({
  isOn,
  onToggle,
  labelLeft = "Light",
  labelRight = "Dark",
  className = "",
}) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Left Label */}
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {labelLeft}
      </span>

      {/* Toggle */}
      <button
        onClick={() => onToggle(!isOn)}
        className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none 
          ${isOn ? "bg-blue-600" : "bg-gray-300 dark:bg-gray-600"}`}
        role="switch"
        aria-checked={isOn}
      >
        <span
          className={`inline-block w-4 h-4 transform bg-white rounded-full shadow transition-transform duration-300
          ${isOn ? "translate-x-6" : "translate-x-1"}`}
        />
      </button>

      {/* Right Label */}
      <span className="text-sm text-gray-700 dark:text-gray-300">
        {labelRight}
      </span>
    </div>
  );
};

export default ToggleButtonComponent;
