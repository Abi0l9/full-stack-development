export interface ContentType {
  name: string;
  exerciseCount: number;
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

export interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackround extends CoursePartDescription {
  backroundMaterial: string;
  kind: "background";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackround
  | CoursePartSpecial;

export interface Note {
  id: number;
  content: string;
}
