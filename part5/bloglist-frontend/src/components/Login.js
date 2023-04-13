import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { newNotification } from "../reducers/notification";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../reducers/user";

const LoginForm = () => {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await blogService.loginUser(username, password);
      dispatch(getUserData(response.data));

      dispatch(
        newNotification({
          message: `${response.data.name} logged in successfully!`,
          type: "success",
        })
      );
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        dispatch(
          newNotification({
            message: "Invalid Username/Password",
            type: "error",
          })
        );
      }
      if (error.message === "Request failed with status code 500") {
        dispatch(
          newNotification({
            message:
              "Connection to the server failed. Please, make sure you have an active internet connection.",
            type: "error",
          })
        );
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username:
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={handleLogin}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleLogin}
          />
        </div>
        <button id="login-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
