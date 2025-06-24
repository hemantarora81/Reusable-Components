import React, { useState } from "react";
import {DropdownComponent} from "..";

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
      <p className="mb-2 text-gray-600 dark:text-gray-300">
        🧺 Select Your Favorite Fruit
      </p>
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
      <div className="mt-4 text-sm text-gray-700 dark:text-gray-300">
        <strong>Selected:</strong> {selected || "None"}
      </div>
    </div>
  );
};

export default DropdownExample;
