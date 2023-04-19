import React from "react";
import Notification from "../Notification";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "../../reducers/notification";
import { removeUserData } from "../../reducers/user";
import { Link, useNavigate } from "react-router-dom";
import { Box, Button } from "@mui/material";

function LoggedInHeader({ setUser }) {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(removeUserData());

    dispatch(
      newNotification({
        message: `${user.name} logged out, successfully!`,
        type: "success",
      })
    );
    setUser("");
    navigate("/");
  };

  return (
    <div>
      {!user.name ? (
        <Button color="inherit" component={Link} to="/">
          Login
        </Button>
      ) : (
        <LoggedInHeader setUser={setUser} />
      )}

      <Box sx={{ display: "flex" }}>
        {user.name} logged in! <br />
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
        <br />
        <Notification />
      </Box>
    </div>
  );
}

export default LoggedInHeader;
