import React from "react";
import Notification from "../Notification";

function LoggedInHeader({ user, handleLogout }) {
  return (
    <div>
      <h1>Blogs</h1>
      {user.name} logged in! <br />
      <button onClick={handleLogout}>Logout</button>
      <Notification />
      <br />
    </div>
  );
}

export default LoggedInHeader;
