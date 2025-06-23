import React, { useState } from "react";
import CheckboxComponent from "../commonComponents/CheckBoxComponent";

const CheckboxExample: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4">
      <CheckboxComponent
        label="I agree to the terms"
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
};

export default CheckboxExample;
