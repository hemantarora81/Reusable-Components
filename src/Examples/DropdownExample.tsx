import React, { useState } from "react";
import DropdownComponent from "../commonComponents/DropdownComponent";

const DropdownExample = () => {
  const [selected, setSelected] = useState("");

  const options = [
    { value: "apple", text: "🍎 Apple" },
    { value: "banana", text: "🍌 Banana" },
    { value: "orange", text: "🍊 Orange" },
    { value: "grape", text: "🍇 Grape" },
  ];

  const handleChange = (event: any) => {
    console.log("Selected:", event.value);
    setSelected(event.value);
  };

  return (
    <div className="w-full transition-colors duration-300">
      {/* Label */}
      <p className="text-gray-600 dark:text-gray-300 mb-2">
        🧺 Select Your Favorite Fruit
      </p>

      {/* Dropdown */}
      <DropdownComponent
        options={options}
        value={selected}
        onChange={handleChange}
        placeholder="Choose a fruit *"
        name="fruits"
        showClearButton
        showSearch
        popupWidth="100%"
        popHeight="200px"
      />

      {/* Selected Value */}
      <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        <strong>Selected:</strong> {selected || "None"}
      </div>
    </div>
  );
};

export default DropdownExample;
