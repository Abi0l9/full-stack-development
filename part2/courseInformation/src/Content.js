import Part from "./Part";
import Total from "./Total";

const Content = ({ content }) => {
  let first = content[0];
  let second = content[1];
  let third = content[2];

  return (
    <div>
      <p>
        {first.name} <Part exercises={first.exercises} />
      </p>
      <p>
        {second.name} <Part exercises={second.exercises} />
      </p>
      <p>
        {third.name} <Part exercises={third.exercises} />
      </p>
      <Total total={first.exercises + second.exercises + third.exercises} />
    </div>
  );
};

export default Content;
