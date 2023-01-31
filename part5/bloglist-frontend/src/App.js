import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState("");
  const [url, setUrl] = useState("");
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

  const clearInputFields = () => {
    setAuthor("");
    setLikes("");
    setTitle("");
    setUrl("");
    setUsername("");
    setPassword("");
  };

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
      clearInputFields();
    } catch (error) {
      clearInputFields();
      if ((error.message = "Request failed with status code 401")) {
        setNotification({
          message: "Invalid Username/Password",
          type: "error",
        });
        clearNotification();
      }
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    clearInputFields();
    clearNotification();
    setNotification({
      message: `${user.name} logged out, successfully!`,
      type: "success",
    });
  };

  const handleBlogInput = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "author") {
      setAuthor(e.target.value);
    } else if (e.target.name === "likes") {
      setLikes(e.target.value);
    } else {
      setUrl(e.target.value);
    }
  };

  const newBlogObj = { title, author, likes, url };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    try {
      const blog = await blogService.addBlog(newBlogObj);
      newBlogObj.id = blog.id;
      setBlogs(blogs.concat(newBlogObj));

      clearInputFields();
      clearNotification();
      setNotification({
        message: `A new blog ${newBlogObj.title} by ${newBlogObj.author} has been added`,
        type: "success",
      });
    } catch (error) {
      clearInputFields();
      clearNotification();
      setNotification({
        message: "Some fields are missing or Invalid Input",
        type: "error",
      });
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
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
            username={username}
            password={password}
            handleLogin={handleLogin}
            handleSubmit={handleSubmit}
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
            <NewBlog
              handleBlogSubmit={handleBlogSubmit}
              handleBlogInput={handleBlogInput}
              author={author}
              title={title}
              url={url}
              likes={likes}
            />
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
