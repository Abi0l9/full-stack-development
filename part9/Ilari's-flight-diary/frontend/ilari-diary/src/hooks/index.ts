import { useState, useEffect } from "react";
import { Element } from "../types";

export const useField = (fieldName: string, element: Element) => {
  const [name, setName] = useState("");
  const [type, setType] = useState("");

  useEffect(() => {
    if ("name" in element && "type" in element) {
      setName(element.name);
      setType(element.type);
    }
  }, []);

  return {
    name,
    type,
  };
};
