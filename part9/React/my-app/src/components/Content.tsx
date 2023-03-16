import { ContentType } from "../types";

const Content = ({ content }: { content: ContentType[] }) => {
  return (
    <div>
      {content.map((course, index) => (
        <p key={index}>
          {course.name} {course.exerciseCount}
        </p>
      ))}
    </div>
  );
};

export default Content;
