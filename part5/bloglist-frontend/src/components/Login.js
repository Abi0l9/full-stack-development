const LoginForm = ({ username, password, handleLogin, handleSubmit }) => {
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
