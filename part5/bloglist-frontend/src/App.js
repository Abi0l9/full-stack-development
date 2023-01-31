import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
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

      setUsername("");
      setPassword("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    setUsername("");
    setPassword("");
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

      setAuthor("");
      setLikes("");
      setTitle("");
      setUrl("");
    } catch (error) {
      console.log(error);
    }
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
