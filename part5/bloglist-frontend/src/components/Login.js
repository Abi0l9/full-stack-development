import { useState } from "react";
import blogService from "../services/blogs";
import PropTypes from "prop-types";
import { newNotification } from "../reducers/notification";
import { useDispatch } from "react-redux";

const LoginForm = ({ setUser }) => {
  const dispatch = useDispatch();
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
      window.localStorage.setItem("user", JSON.stringify(response.data));
      setUser(response.data);
      blogService.setToken(response.data.token);

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

LoginForm.propTypes = {
  setUser: PropTypes.func.isRequired,
};

export default LoginForm;
