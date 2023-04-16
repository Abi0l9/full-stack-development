import { useState, useEffect } from "react";
import LoginView from "./components/LoginView";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { initializeBlogs, removeBlog, updateLikes } from "./reducers/blog";
import { newNotification } from "./reducers/notification";
import { removeUserData } from "./reducers/user";
import { useQuery } from "react-query";
import { Route, Routes } from "react-router-dom";
import UsersList from "./components/UserView/UsersList";
import Home from "./components/Home";

const App = () => {
  const { data: blogsQ } = useQuery("blogs", blogService.getAll, {
    retry: 1,
    refetchOnWindowFocus: false,
  });
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  const loggedInUser = useSelector((state) => state.user);
  const [user, setUser] = useState({});

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
        <Route path="/users" element={<UsersList />} />
        <Route path="/users/:id" />
      </Routes>
    </div>
  );
};

export default App;
