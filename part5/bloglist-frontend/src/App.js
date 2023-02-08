import { useState, useEffect, useRef } from "react";
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

  const blogFormRef = useRef();

  // const clearInputFields = () => {
  //   setAuthor("");
  //   setLikes("");
  //   setTitle("");
  //   setUrl("");
  // };

  // const handleBlogInput = (e) => {
  //   if (e.target.name === "title") {
  //     setTitle(e.target.value);
  //   } else if (e.target.name === "author") {
  //     setAuthor(e.target.value);
  //   } else if (e.target.name === "likes") {
  //     setLikes(e.target.value);
  //   } else {
  //     setUrl(e.target.value);
  //   }
  // };

  // const newBlogObj = { title, author, likes, url };

  const handleBlogSubmit = async (newBlogObj) => {
    try {
      const blog = await blogService.addBlog(newBlogObj);
      newBlogObj.id = blog.id;

      blogs.concat(newBlogObj);
      setBlogs([...blogs]);

      blogFormRef.current.toggleVisibility();

      console.log(blog);

      clearNotification();
      setNotification({
        message: `A new blog ${newBlogObj.title} by ${newBlogObj.author} has been added`,
        type: "success",
      });
    } catch (error) {
      clearNotification();
      console.log(error.message);
      setNotification({
        message: "Some fields are missing or Invalid Input",
        type: "error",
      });
    }
  };

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

  const updateLikesField = async (blog, likesPatchObj, likesRef) => {
    const blogId = blog.id;
    try {
      likesPatchObj.likes += 1;
      const newObj = { likes: String(likesPatchObj.likes) };
      likesRef.current.textContent = newObj.likes;

      await blogService.updateLikes(blogId, newObj);
      //update likes field immediately
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteSingleBlog = async (blog) => {
    const blogId = blog.id;
    const blogIdx = blogs.findIndex((blog) => blog.id === blogId);
    const message = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(message)) {
      try {
        await blogService.deleteBlog(blogId);
        blogs.splice(blogIdx, 1);
        setBlogs([...blogs]);
        setNotification({ message: "Deleted successfully!", type: "success" });
        clearNotification();
      } catch (error) {
        console.log(error.message);
        setNotification({ message: "Oops...an error occurred", type: "error" });
        clearNotification();
      }
    }
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
            <Toggable buttonText="Add blog" ref={blogFormRef}>
              <NewBlog handleBlogSubmit={handleBlogSubmit} />
            </Toggable>
          </div>
          <br />
          <div>
            {blogs
              .sort(
                (first, second) => Number(second.likes) - Number(first.likes)
              )
              .map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  updateLikesField={updateLikesField}
                  deleteSingleBlog={deleteSingleBlog}
                  user={user}
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
