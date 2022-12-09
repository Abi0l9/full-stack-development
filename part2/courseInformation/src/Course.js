import Content from "./Content";
import Header from "./Header";

const Course = ({ course }) => {
  //task completed
  return (
    <div>
      {course.map((item) => (
        <div key={item.id}>
          <Header name={item.name} />
          <Content content={item.parts} />
        </div>
      ))}
    </div>
  );
};

export default Course;
