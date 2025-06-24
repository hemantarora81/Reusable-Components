import React, { useState } from "react";
import { CheckBoxComponent } from "..";

const CheckboxExample: React.FC = () => {
  const [checked, setChecked] = useState(false);

  return (
    <div className="p-4">
      <CheckBoxComponent
        label="I agree to the terms"
        checked={checked}
        onChange={setChecked}
      />
    </div>
  );
};

export default CheckboxExample;
