import { useState } from "react";
import blogService from "../services/blogs";

const LoginForm = ({ setNotification, clearNotification, setUser }) => {
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

      setNotification({
        message: `${response.data.name} logged in successfully!`,
        type: "success",
      });
      clearNotification();
    } catch (error) {
      if (error.message === "Request failed with status code 401") {
        setNotification({
          message: "Invalid Username/Password",
          type: "error",
        });
        clearNotification();
      }
      if (error.message === "Request failed with status code 500") {
        setNotification({
          message:
            "Connection to the server failed. Please, make sure you have an active internet connection.",
          type: "error",
        });
        clearNotification();
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
            value={username}
            onChange={handleLogin}
          />
        </div>
        <div>
          password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleLogin}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
export default LoginForm;
