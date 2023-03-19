import { CoursePart } from "../types";

const Part = ({ content }: { content: CoursePart[] }) => {
  return (
    <div>
      {content.map((part) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name} style={{ marginBottom: "1rem" }}>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <i>{part.description}</i>
              </div>
            );
          case "background":
            return (
              <div key={part.name} style={{ marginBottom: "1rem" }}>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <i>{part.description}</i>
                <br />
                <span>{part.backroundMaterial}</span>
              </div>
            );
          case "group":
            return (
              <div key={part.name} style={{ marginBottom: "1rem" }}>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <span>project exercises {part.groupProjectCount}</span>
              </div>
            );
          default:
            break;
        }
      })}
    </div>
  );
};

export default Part;

// case "group":
//   return part.name;

//   break;
// case "background":
//   console.log(part.name);

//   return part.name;
