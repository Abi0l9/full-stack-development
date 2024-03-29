import { useSelector } from "react-redux";

const Notification = () => {
  const { message, type } = useSelector((store) => store.notification);
  const success = {
    position: "absolute",
    top: "3rem",
    right: 0,
    color: "green",
    fontSize: 13,
    border: "solid 2px green",
    padding: 5,
    margin: "1rem 1rem",
    borderRadius: ".5rem",
  };

  const error = {
    position: "absolute",
    top: "3rem",
    right: 0,
    color: "red",
    fontSize: 13,
    border: "solid 2px red",
    padding: 5,
    margin: "1rem 1rem",
    borderRadius: ".5rem",
  };

  const neutral = {};

  const main =
    (type === "success" && success) || (type === "error" && error) || neutral;

  return (
    <div>
      <span style={main} className="message">
        {message ? message : null}
      </span>
    </div>
  );
};
export default Notification;
