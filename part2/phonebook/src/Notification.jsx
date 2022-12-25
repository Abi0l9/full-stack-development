const Notification = ({ message, type }) => {
  const success = {
    color: "green",
    fontSize: 13,
    border: "solid 2px green",
    padding: 5,
    margin: "1rem 1rem",
    borderRadius: ".5rem",
  };

  const error = {
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

  return <span style={main}>{message ? message : null}</span>;
};

export default Notification;
