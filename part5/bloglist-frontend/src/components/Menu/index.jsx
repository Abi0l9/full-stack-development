import React from "react";
import { AppBar, Box, Toolbar, Button } from "@mui/material";
import { Link } from "react-router-dom";
import LoggedInHeader from "../LoginView/LoggedInHeader";

function Menu({ setUser }) {
  return (
    <Box>
      <AppBar position="static">
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Box>
            <Button color="inherit" component={Link} to="/">
              Blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              Users
            </Button>
          </Box>
          <Box>
            <LoggedInHeader setUser={setUser} />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Menu;
