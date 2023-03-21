import { NewDiaryEntries, Element, objt } from "../types";
import { assertNever } from "../utils";
import { useRef, useState } from "react";
import { initialValues } from "../formFields";
import Button from "./Button";
import DiaryServices from "../services/diaries";

const Form = ({ elements }: { elements: Element[] }) => {
  const [values, setValues] = useState<objt>(initialValues(elements));
  const textFieldsRef = useRef<HTMLInputElement | null>(null);
  const dateFieldsRef = useRef<HTMLInputElement | null>(null);
  const radioFieldsRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name.toLowerCase();

    setValues({ ...values, [fieldName]: e.target.value });
    if (e.target.type === "radio") {
      setValues({ ...values, [fieldName]: e.target.title });
    }
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const buttonValueToBeRemoved = Object.keys(values).at(-1);

    delete values[`${buttonValueToBeRemoved}`];
    try {
      DiaryServices.AddDiary(values as NewDiaryEntries); //here
      if (
        textFieldsRef.current &&
        dateFieldsRef.current &&
        radioFieldsRef.current
      ) {
        textFieldsRef.current.value = "";
        dateFieldsRef.current.value = "";
        radioFieldsRef.current.value = "";
      }
    } catch (error) {
      let errorMsg = "Something occurred, ";
      if (error instanceof Error) {
        errorMsg += error.message;
      }
      console.log(errorMsg);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {elements.map((element, index) => {
          switch (element.type) {
            case "text":
              return (
                <div key={element.name + index}>
                  <label>{element.name}</label>:{" "}
                  <input
                    ref={textFieldsRef}
                    title={element.name}
                    name={element.name}
                    id={element.name}
                    type={element.type}
                    onChange={handleChange}
                  />
                </div>
              );
            case "password":
              return (
                <div key={element.name + index}>
                  <label>{element.name}</label>:{" "}
                  <input
                    title={element.name}
                    name={element.name}
                    id={element.name}
                    type={element.type}
                    onChange={handleChange}
                  />
                </div>
              );
            case "checkbox":
              return (
                <div key={element.name + index}>
                  <label>{element.name}</label>:{" "}
                  <input
                    title={element.name}
                    name={element.name}
                    id={element.name}
                    type={element.type}
                    onChange={handleChange}
                  />
                </div>
              );
            case "radio":
              return (
                <div key={element.name + index}>
                  <label>{element.name}</label>:{" "}
                  {element.values.map((val) => (
                    <span key={val}>
                      <label>{val}</label>:
                      <input
                        ref={radioFieldsRef}
                        type={element.type}
                        title={val}
                        name={element.name}
                        id={element.name}
                        onChange={handleChange}
                      />{" "}
                    </span>
                  ))}
                </div>
              );
            case "date":
              return (
                <div key={element.name + index}>
                  <label>{element.name}</label>:{" "}
                  <input
                    ref={dateFieldsRef}
                    title={element.name}
                    name={element.name}
                    id={element.name}
                    type={element.type}
                    onChange={handleChange}
                  />
                </div>
              );
            case "number":
              return (
                <div key={element.name + index}>
                  <label>{element.name}</label>:{" "}
                  <input
                    title={element.name}
                    name={element.name}
                    id={element.name}
                    type={element.type}
                    onChange={handleChange}
                  />
                </div>
              );
            case "submit":
              return (
                <div key={element.name + index}>
                  <Button name={element.name} type={element.type} />
                </div>
              );
            case "button":
              return (
                <div key={element.name + index}>
                  <Button name={element.name} type={element.type} />
                </div>
              );
            case "reset":
              return (
                <div key={element.name + index}>
                  <Button name={element.name} type={element.type} />
                </div>
              );
            default:
              return assertNever(element);
          }
        })}
      </form>
    </div>
  );
};

export default Form;
