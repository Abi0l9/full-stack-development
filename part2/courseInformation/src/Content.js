import Part from "./Part";
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
    </div>
  );
};

export default Content;
