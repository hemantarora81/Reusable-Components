import React, { useState } from "react";
import {TextAreaComponent} from "..";

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
