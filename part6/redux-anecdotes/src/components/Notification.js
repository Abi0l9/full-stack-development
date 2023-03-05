// import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  let notification = useSelector((notification) => notification.notification);

  const style = {
    display: notification ? "block" : "none",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  return <div style={style}>you voted '{notification}'</div>;
};

export default Notification;
