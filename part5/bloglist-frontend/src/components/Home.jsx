import React from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "../reducers/notification";
import { removeBlog, updateLikes } from "../reducers/blog";
import Notification from "./Notification";
import NewBlog from "./NewBlog";
import { blogSorter } from "../utils";
import Toggable from "./Toggable";
import Blog from "./Blog";

function Home({ user, handleLogout, deleteSingleBlog, updateLikesField }) {
  //   const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);
  //   const loggedInUser = useSelector((state) => state.user);

  //   const [user, setUser] = React.useState({});
  const blogFormRef = React.useRef();

  //   useEffect(() => {
  //     if (loggedInUser) {
  //       setUser(loggedInUser);
  //     }
  //   });

  //   useEffect(() => {
  //     dispatch(initializeBlogs());
  //   }, []);

  //   useEffect(() => {
  //     let storage = localStorage.user;
  //     if (storage) {
  //       const data = JSON.parse(storage);
  //       setUser(data);
  //       blogService.setToken(data.token);
  //     }
  //   }, []);

  //   const handleLogout = () => {
  //     dispatch(removeUserData());

  //     dispatch(
  //       newNotification({
  //         message: `${user.name} logged out, successfully!`,
  //         type: "success",
  //       })
  //     );

  //     setUser("");
  //   };

  //   const deleteSingleBlog = async (selectedBlog) => {
  //     const message = `Remove blog ${selectedBlog.title} by ${selectedBlog.author}`;

  //     if (window.confirm(message)) {
  //       try {
  //         dispatch(removeBlog(selectedBlog, blogs));

  //         dispatch(
  //           newNotification({
  //             message: "Deleted successfully!",
  //             type: "success",
  //           })
  //         );
  //       } catch (error) {
  //         console.log(error.message);
  //         dispatch(
  //           newNotification({
  //             message: "Oops...an error occurred",
  //             type: "error",
  //           })
  //         );
  //       }
  //     }
  //   };
  //   const updateLikesField = async (selectedBlog) => {
  //     try {
  //       dispatch(updateLikes(selectedBlog, blogs));
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   };

  return (
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
        {blogs?.map((blog) => (
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
  );
}

export default Home;
