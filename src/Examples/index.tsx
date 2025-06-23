import { useTheme } from "../contexts/ThemeContext";
import CheckboxExample from "./CheckBoxExample";
import DropdownExample from "./DropdownExample";
import GridTableExample from "./GridTableExample";
import MultiSelectExample from "./MultiSelectExample";
import TextAreaExample from "./TextAreaExample";
import TextBoxExample from "./TextBoxExample";
import ToggleExample from "./ToggleExample";

const Examples = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen p-6 transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Dropdown Components Showcase
        </h1>
        <button
          onClick={toggleTheme}
          className="px-3 py-1 text-sm text-gray-800 transition bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600"
        >
          {theme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
        <div className="p-5 transition-colors bg-white rounded shadow-sm dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold dark:text-white">MultiSelect Dropdown</h2>
          <MultiSelectExample />
        </div>

        <div className="p-5 transition-colors bg-white rounded shadow-sm dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold dark:text-white"> Dropdown</h2>
          <DropdownExample />
        </div> 
         <div className="p-5 transition-colors bg-white rounded shadow-sm dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold dark:text-white">Floating TextArea</h2>
          <TextAreaExample />
        </div>  
         <div className="p-5 transition-colors bg-white rounded shadow-sm dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold dark:text-white">Floating TextBox</h2>
          <TextBoxExample />
        </div>   
        <div className="p-5 transition-colors bg-white rounded shadow-sm dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold dark:text-white">Toggle Button</h2>
          <ToggleExample />
        </div>
        <div className="p-5 transition-colors bg-white rounded shadow-sm dark:bg-gray-800">
          <h2 className="mb-3 text-lg font-semibold dark:text-white">CheckBox Component</h2>
          <CheckboxExample />
        </div>
      </div>
      <div>
        <GridTableExample />
      </div>
    </div>
  );
};

export default Examples;
