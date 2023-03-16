import { ContentType } from "../types";

const Total = ({ total }: { total: ContentType[] }) => {
  const numOfCourses = total.reduce(
    (carry, part) => carry + part.exerciseCount,
    0
  );
  return <div>Number of exercises {numOfCourses}</div>;
};

export default Total;
