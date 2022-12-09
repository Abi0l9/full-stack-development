import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  let { name, parts } = course;

  return (
    <div>
      <Header name={name} />
      <Content content={parts} />
    </div>
  );
};

export default Course;
