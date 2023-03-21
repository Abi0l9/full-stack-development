import { Element, objt } from "./types";

export const fields: Element[] = [
  { name: "First Name", type: "text" },
  { name: "Last Name", type: "text" },
  { name: "Phone Number", type: "number" },
  { name: "Address", type: "text" },
  { name: "City", type: "text" },
  { name: "State", type: "text" },
  { name: "Date of Birth", type: "date" },
  { name: "Agreed to terms?", type: "checkbox" },
  { name: "Submit", type: "submit" },
];

export const contactFields: Element[] = [
  { name: "Name", type: "text" },
  { name: "Email", type: "text" },
  { name: "Phone Number", type: "number" },
  { name: "Message", type: "text" },
  { name: "Send", type: "submit" },
];

export const LoginFields: Element[] = [
  { name: "Username", type: "text" },
  { name: "Password", type: "password" },
  { name: "Send", type: "submit" },
];

export const DiaryFields: Element[] = [
  { name: "date", type: "date" },
  {
    name: "visibility",
    type: "radio",
    values: ["great", "good", "ok", "poor"],
  },
  {
    name: "weather",
    type: "radio",
    values: ["sunny", "rainy", "cloudy", "stormy", "windy"],
  },
  { name: "comment", type: "text" },
  { name: "add", type: "submit" },
];

export const SelectFields: Element[] = [
  {
    name: "choose your favourite",
    type: "radio",
    values: ["one", "two", "three"],
  },
  { name: "Send", type: "submit" },
];

export const initialValues = (fields: Element[]) => {
  return fields
    .map((field) => field.name)
    .reduce((obj: objt, field) => {
      const key = field.toLowerCase() as string;
      obj[key] = "";
      return obj;
    }, {});
};
