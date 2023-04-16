import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const User = () => {
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/users/:id");
  // const loggedInUser =
  return <div></div>;
};

export default User;
