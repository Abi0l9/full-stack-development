import { createContext, useReducer, useContext } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "VOTE":
      state = `anecdote '${action.votes}' voted`;
      return state;
    case "CLEAR":
      state = "";
      return state;
    case "CREATE":
      state = action.message;
      return state;
    default:
      return state;
  }
};

const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    ""
  );
  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {props.children}
    </NotificationContext.Provider>
  );
};

export default NotificationContext;

export const clearNotitification = (fn) => {
  setTimeout(() => {
    fn({ type: "CLEAR" });
  }, 5000);
};

export const makeNotitification = (fn, anecdote) => {
  fn({ type: "VOTE", votes: anecdote.content });
};

export const useNotification = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch[0];
};
export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext);

  return notificationAndDispatch[1];
};
