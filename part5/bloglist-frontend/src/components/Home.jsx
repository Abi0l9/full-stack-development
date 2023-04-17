import React from "react";
import blogService from "../services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { newNotification } from "../reducers/notification";
import { removeBlog, updateLikes } from "../reducers/blog";
import Notification from "./Notification";
import NewBlog from "./NewBlog";
import Toggable from "./Toggable";
import Blog from "./Blog";

function Home({ user, deleteSingleBlog, updateLikesField }) {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = React.useRef();

  return (
    <div>
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
