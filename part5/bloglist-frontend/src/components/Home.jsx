import React from "react";
import { useSelector } from "react-redux";
import NewBlog from "./NewBlog";
import Toggable from "./Toggable";
import Blog from "./Blog";
import { Box, Typography } from "@mui/material";

function Home({ user, deleteSingleBlog, updateLikesField }) {
  const blogs = useSelector((state) => state.blogs);
  const blogFormRef = React.useRef();

  return (
    <div>
      <Box sx={{}}>
        <Typography variant="h4">Blog app</Typography>
        <Toggable buttonText="Add blog" ref={blogFormRef}>
          <NewBlog blogFormRef={blogFormRef} />
        </Toggable>
      </Box>
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
  );
}

export default Home;
