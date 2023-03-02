import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearNotification } from "../reducers/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  let notification = useSelector((notification) => notification.notification);

  const style = {
    display: notification ? "block" : "none",
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };

  useEffect(() => {
    if (notification) {
      setTimeout(() => {
        dispatch(clearNotification());
      }, 5000);
    }
  }, [dispatch, notification]);

  return <div style={style}>{notification}</div>;
};

export default Notification;
