import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { LOGIN } from "../../queries";
import { Box, Button, TextField, Typography } from "@mui/material";

const LoginForm = ({ setPage, setToken, show }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log(error.message);
    },
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    login({ variables: { username, password } });
    setUsername("");
    setPassword("");
    setPage("authors");
  };

  useEffect(() => {
    if (result?.data) {
      const token = result?.data?.login.value;
      setToken(token);
      localStorage.setItem("token", token);
    }
  }, [result?.data?.login.value]); // eslint-disable-line

  if (!show) {
    return null;
  }

  return (
    <div>
      <Typography variant="h4">Login Page</Typography>
      <form onSubmit={handleLogin}>
        <Box>
          <TextField
            label="username"
            variant="standard"
            name="username"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Box>
        <Box>
          <TextField
            label="password"
            variant="standard"
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Box>
        <Box sx={{ mt: 1, mb: 1 }}>
          <Button type="submit" variant="outlined" color="success">
            Login
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default LoginForm;
