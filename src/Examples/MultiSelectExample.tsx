import React, { useState } from "react";
import MultiSelectDropdown from "../commonComponents/MultiSelectComponent";

const MultiSelectExample: React.FC = () => {
  const [selectedValue, setSelectedValue] = useState<string | string[]>("");

  const handleChange = (event: { target: { value: any; name?: string } }) => {
    setSelectedValue(event.target.value);
  };

  const options = [
    { value: "apple", text: "🍎 Apple" },
    { value: "banana", text: "🍌 Banana" },
    { value: "orange", text: "🍊 Orange" },
    { value: "mango", text: "🥭 Mango" },
  ];

  return (
      <div className="w-full">
  <p className="text-gray-600 dark:text-gray-300 mb-2">Choose your fruits</p>
        <MultiSelectDropdown
          name="fruits"
          value={selectedValue}
          onChange={handleChange}
          options={options}
          placeholder="Select fruits*"
          showClearButton
          showSearch
          mode="checkbox"
          isCheckable
          selectAllText="Select All Fruits"
          error={
            Array.isArray(selectedValue) && selectedValue.length === 0
              ? "Please select at least one fruit"
              : ""
          }
        />
         <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
          <strong>Selected:</strong>{" "}
          {Array.isArray(selectedValue)
            ? selectedValue.join(", ")
            : selectedValue}
        </div>
      </div>
  );
};

export default MultiSelectExample;
