import { useState } from "react";
import blogService from "../services/blogs";
import { newNotification } from "../reducers/notification";
import { useDispatch } from "react-redux";
import { getUserData } from "../reducers/user";
import { Box, Button, TextField } from "@mui/material";

const LoginForm = () => {
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
        <Box>
          <TextField
            required
            id="username"
            name="username"
            value={username}
            onChange={handleLogin}
            label="Type username here"
            variant="standard"
          />
        </Box>
        <Box>
          <TextField
            required
            id="password"
            name="password"
            type="password"
            value={password}
            onChange={handleLogin}
            label="Type password here"
            variant="standard"
          />
        </Box>
        <Box sx={{ marginTop: 2 }}>
          <Button id="login-button" variant="outlined" type="submit">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
