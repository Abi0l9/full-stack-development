import Part from "./Part";
import Total from "./Total";

const Content = ({ content }) => {
  return (
    <div>
      {content.map((el) => (
        <p key={el.id}>
          {el.name} <Part exercises={el.exercises} />
        </p>
      ))}
      <Total total={content} />
    </div>
  );
};

export default Content;
