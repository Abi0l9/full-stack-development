import { CoursePart } from "../types";
import { assertNever } from "../utils";

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
          case "special":
            return (
              <div key={part.name} style={{ marginBottom: "1rem" }}>
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <i>{part.description}</i>
                <br />
                <span>required skills: {part.requirements.join(", ")}.</span>
              </div>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
};

export default Part;
