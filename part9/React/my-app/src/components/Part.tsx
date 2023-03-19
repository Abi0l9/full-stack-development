import { CoursePart } from "../types";
import { assertNever } from "../utils";
import "./Part.css";

const Part = ({ content }: { content: CoursePart[] }) => {
  return (
    <div>
      {content.map((part, index) => {
        switch (part.kind) {
          case "basic":
            return (
              <div key={part.name + index} className="block">
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <i>{part.description}</i>
              </div>
            );
          case "background":
            return (
              <div key={part.name + index} className="block">
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
              <div key={part.name + index} className="block">
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <span>project exercises {part.groupProjectCount}</span>
              </div>
            );
          case "special":
            return (
              <div key={part.name + index} className="block">
                <b>
                  {part.name} {part.exerciseCount}
                </b>
                <br />
                <i>{part.description}</i>
                <br />
                <span>
                  required skills:{" "}
                  {part.requirements.length > 1
                    ? part.requirements.join(", ")
                    : part.requirements[0]}
                  .
                </span>
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
