import React, { useState, useEffect } from "react";
import ToggleButtonComponent from "../commonComponents/ToggleComponent";

const ToggleExample: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="p-4">
      <ToggleButtonComponent
        isOn={darkMode}
        onToggle={setDarkMode}
        labelLeft="🌞"
        labelRight="🌜"
      />
    </div>
  );
};

export default ToggleExample;
