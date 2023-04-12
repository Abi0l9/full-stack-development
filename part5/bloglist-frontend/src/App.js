import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs } from "./reducers/blog";
import { newNotification } from "./reducers/notification";

const App = () => {
  const blog = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(blog);
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState("");
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  const blogFormRef = useRef();

  const handleBlogSubmit = async (newBlogObj) => {
    try {
      const blog = await blogService.addBlog(newBlogObj);
      newBlogObj.id = blog.id;

      setBlogs(blogs.concat(newBlogObj));

      blogFormRef.current.toggleVisibility();

      dispatch(
        newNotification(
          {
            message: `A new blog ${newBlogObj.title} by ${newBlogObj.author} has been added`,
            type: "success",
          },
          3000
        )
      );
    } catch (error) {
      dispatch(
        newNotification(
          {
            message: "Some fields are missing or Invalid Input",
            type: "error",
          },
          3000
        )
      );
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem("user");
    dispatch(
      newNotification(
        {
          message: `${user.name} logged out, successfully!`,
          type: "success",
        },
        3000
      )
    );
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

        dispatch(
          newNotification(
            {
              message: "Deleted successfully!",
              type: "success",
            },
            3000
          )
        );
      } catch (error) {
        console.log(error.message);
        dispatch(
          newNotification(
            {
              message: "Oops...an error occurred",
              type: "error",
            },
            3000
          )
        );
      }
    }
  };

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));

    dispatch(initializeBlogs());
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

          <Notification />
          <br />
          <LoginForm setNotification={setNotification} setUser={setUser} />
        </div>
      ) : (
        <div>
          <h2>blogs</h2>
          <Notification />
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
