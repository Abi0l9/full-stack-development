import React from "react";
import Notification from "../Notification";
import LoginForm from "../Login";

function LoginView() {
  return (
    <div>
      <h1>Login into the application</h1>

      <Notification />
      <br />
      <LoginForm />
    </div>
  );
}

export default LoginView;
