import Content from "./components/Content";
import Header from "./components/Header";
import Total from "./components/Total";
import { ContentType } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: ContentType[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={courseParts} />
    </div>
  );
};

export default App;
