import { useState, useEffect } from "react";
import LoginView from "./components/LoginView";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, removeBlog, updateLikes } from "./reducers/blog";
import { newNotification } from "./reducers/notification";
import { getUserData, removeUserData } from "./reducers/user";
import { Route, Routes, useNavigate } from "react-router-dom";
import UsersList from "./components/UserView/UsersList";
import Home from "./components/Home";
import User from "./components/UserView/User";
import SingleBlog from "./components/BlogView/SingleBlog";
import Menu from "./components/Menu";

const App = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, [loggedInUser]);

  const handleLogout = () => {
    dispatch(removeUserData());

    dispatch(
      newNotification({
        message: `${user.name} logged out, successfully!`,
        type: "success",
      })
    );

    setUser("");
    navigate("/");
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
  }, [dispatch]);
  useEffect(() => {
    let storage = localStorage.user;
    if (storage) {
      const data = JSON.parse(storage);
      setUser(data);
      dispatch(getUserData(data));
      blogService.setToken(data.token);
    }
  }, [dispatch]);

  return (
    <div>
      <Menu setUser={setUser} />
      <Routes>
        <Route
          path="/"
          element={
            !user.name ? (
              <LoginView />
            ) : (
              <Home
                user={user}
                handleLogout={handleLogout}
                deleteSingleBlog={deleteSingleBlog}
                updateLikesField={updateLikesField}
              />
            )
          }
        />
        <Route path="/blogs" />
        <Route
          path="/blogs/:id"
          element={<SingleBlog updateLikesField={updateLikesField} />}
        />
        <Route path="/login" element={<LoginView />} />
        <Route
          path="/users"
          element={
            !user.name ? (
              <LoginView />
            ) : (
              <UsersList user={user} handleLogout={handleLogout} />
            )
          }
        />
        <Route
          path="/users/:id"
          element={!user.name ? <LoginView /> : <User />}
        />
      </Routes>
    </div>
  );
};

export default App;
