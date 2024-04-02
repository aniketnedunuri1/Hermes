import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";
import Label from "./Label";

const TagInput = ({selected, setSelected}) => {
//   const [selected, setSelected] = useState([""]);

  return (
    <div className={`block pl-1 text-xs
    font-normal leading-tight text-gray-500 dark:text-gray-400`}>
      {/* <h1>Add Fruits</h1>
      <pre>{JSON.stringify(selected)}</pre> */}
      <Label>
         Add Revelent Keywords (e.g: "marketing head", "business development")
      </Label>
      <TagsInput
       
        value={selected}
        onChange={setSelected}
        name="keywords"
        placeHolder="Enter Keywords"
      />
      <em>press enter or comma to add new tag</em>
    </div>
  );
};

export default TagInput;