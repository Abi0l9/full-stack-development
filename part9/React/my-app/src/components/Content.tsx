import { CoursePart } from "../types";
import Part from "./Part";

const Content = ({ content }: { content: CoursePart[] }) => {
  return (
    <div>
      <Part content={content} />
    </div>
  );
};

export default Content;
