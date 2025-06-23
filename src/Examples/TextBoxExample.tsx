import React, { useState } from "react";
import TextBoxComponent from "../commonComponents/TextBoxComponent";

const TextBoxExample = () => {


  return (
    <div className="w-full transition-colors duration-300">
   <TextBoxComponent
  name="name"
  placeholder="Name"
/>

    </div>
  );
};

export default TextBoxExample;
