import React, { useState } from "react";
import TextAreaComponent from "../commonComponents/TextAreaComponent";

const TextAreaExample = () => {


  return (
    <div className="w-full transition-colors duration-300">
   <TextAreaComponent
  name="bio"
  placeholder="Your bio"
 
/>

    </div>
  );
};

export default TextAreaExample;
