interface BaseElement {
  name: string;
}

interface TextField extends BaseElement {
  type: "text";
}

interface RadioField extends BaseElement {
  values: string[];
  type: "radio";
}

interface CheckboxField extends BaseElement {
  type: "checkbox";
}

interface DateField extends BaseElement {
  type: "date";
}

interface NumberField extends BaseElement {
  type: "number";
}

interface PasswordField extends BaseElement {
  type: "password";
}

export interface ButtonField extends BaseElement {
  type: "button" | "reset" | "submit";
}

export type Element =
  | TextField
  | NumberField
  | TextField
  | RadioField
  | CheckboxField
  | DateField
  | PasswordField
  | ButtonField;

type Weather = "sunny" | "rainy" | "cloudy" | "stormy" | "windy";
type Visibility = "great" | "good" | "ok" | "poor";

export interface DiaryEntries {
  date: string;
  comment: string;
  weather: Weather;
  visibility: Visibility;
}

export interface NewDiaryEntries extends DiaryEntries {
  id: number;
}

export type objt = Record<string, any>;
