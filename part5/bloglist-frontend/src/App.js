import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/Login";
import NewBlog from "./components/NewBlog";
import Notification from "./components/Notification";
import Toggable from "./components/Toggable";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, removeBlog, updateLikes } from "./reducers/blog";
import { newNotification } from "./reducers/notification";
import { removeUserData } from "./reducers/user";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const blogFormRef = useRef();

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  });

  const handleLogout = () => {
    dispatch(removeUserData());

    dispatch(
      newNotification({
        message: `${user.name} logged out, successfully!`,
        type: "success",
      })
    );

    setUser("");
  };

  const updateLikesField = async (selectedBlog) => {
    try {
      dispatch(updateLikes(selectedBlog, blogs));
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteSingleBlog = async (selectedBlog) => {
    const message = `Remove blog ${selectedBlog.title} by ${selectedBlog.author}`;

    if (window.confirm(message)) {
      try {
        dispatch(removeBlog(selectedBlog, blogs));

        dispatch(
          newNotification({
            message: "Deleted successfully!",
            type: "success",
          })
        );
      } catch (error) {
        console.log(error.message);
        dispatch(
          newNotification({
            message: "Oops...an error occurred",
            type: "error",
          })
        );
      }
    }
  };

  useEffect(() => {
    dispatch(initializeBlogs());
  }, []);
  useEffect(() => {
    let storage = localStorage.user;
    if (storage) {
      const data = JSON.parse(storage);
      setUser(data);
      blogService.setToken(data.token);
    }
  }, []);

  return (
    <div>
      {!user.name ? (
        <div>
          <h1>Login into the application</h1>

          <Notification />
          <br />
          <LoginForm />
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
              <NewBlog blogFormRef={blogFormRef} />
            </Toggable>
          </div>
          <br />
          <div>
            {blogs.map((blog) => (
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
