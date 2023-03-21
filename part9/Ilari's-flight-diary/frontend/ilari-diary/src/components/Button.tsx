import { ButtonField } from "../types";

function Button({ name, type }: ButtonField) {
  return <button type={type}>{name}</button>;
}

export default Button;
