import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const clearNotification = () => {
    setTimeout(() => {
      setNotification({
        message: "",
        type: "",
      });
    }, 5000);
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    clearNotification();
    setNotification({
      message: `${user.name} logged out, successfully!`,
      type: "success",
    });
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem("user");
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  return (
    <div>
      {!user ? (
        <div>
          <h1>Login into the application</h1>

          <Notification
            message={notification.message}
            type={notification.type}
          />
          <br />
          <LoginForm
            setNotification={setNotification}
            clearNotification={clearNotification}
            setUser={setUser}
          />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification
            message={notification.message}
            type={notification.type}
          />
          <br />
          <div>
            <strong>{user.name}</strong> logged in!
            <button onClick={handleLogout}>Logout</button>
          </div>
          <div>
            <Toggable buttonText="Add blog">
              <NewBlog
                setNotification={setNotification}
                clearNotification={clearNotification}
                setBlogs={setBlogs}
                blogs={blogs}
              />
            </Toggable>
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
