const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  );
};

const Part1 = (props) => {
  return (
    <div>
      <p>
        {props.part[0]} {props.part[1]}
      </p>
    </div>
  );
};

const Part2 = (props) => {
  return (
    <div>
      <p>
        {props.part[0]} {props.part[1]}
      </p>
    </div>
  );
};

const Part3 = (props) => {
  return (
    <div>
      <p>
        {props.part[0]} {props.part[1]}
      </p>
    </div>
  );
};

const Content = (props) => {
  const part1 = [props.parts[0].name, props.parts[0].exercises];
  const part2 = [props.parts[1].name, props.parts[1].exercises];
  const part3 = [props.parts[2].name, props.parts[2].exercises];
  return (
    <div>
      <Part1 part={part1} />
      <Part2 part={part2} />
      <Part3 part={part3} />
    </div>
  );
};

const Total = (props) => {
  return (
    <div>
      <p>
        Number of exercises{" "}
        {props.parts[0].exercises +
          props.parts[1].exercises +
          props.parts[2].exercises}
      </p>
    </div>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [
      { name: "Fundamentals of React", exercises: 10 },
      { name: "Using props to pass data", exercises: 7 },
      { name: "State of a component", exercises: 14 },
    ],
  };

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  );
};
export default App;
