import { useState } from "react";

export const useField = (name) => {
  const [value, setValue] = useState("");

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    name,
    value,
    onChange,
    reset,
  };
};

export const useReset = () => {
  //   const [value, setValue] = useState("");

  const onClick = (e) => {
    e.preventDefault();
    // return () => (e.target.value = "");
    console.log(e.target.value);
  };
  //   setValue(()=> e.target.value = "")
  return { onClick };
};
