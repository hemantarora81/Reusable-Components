import React, { useState, useEffect } from "react";
import {ToggleComponent} from "..";

const ToggleExample: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="p-4">
      <ToggleComponent
        isOn={darkMode}
        onToggle={setDarkMode}
        labelLeft="🌞"
        labelRight="🌜"
      />
    </div>
  );
};

export default ToggleExample;
