import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const handleLogin = (e) => {
    e.target.name === "username"
      ? setUsername(e.target.value)
      : setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    blogService.loginUser(username, password, setUser);
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {!user ? (
        <div>
          <LoginForm
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleSubmit={handleSubmit}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            <strong>{user.name}</strong> logged in!
          </div>
          <br />
          <div>
            {blogs.map((blog) => (
              <Blog key={blog.id} blog={blog} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
