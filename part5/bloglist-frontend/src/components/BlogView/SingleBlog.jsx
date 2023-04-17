import React from "react";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

function SingleBlog({ updateLikesField }) {
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/blogs/:id");
  const selectedBlog =
    match && blogs.find((blog) => blog.id === match.params.id);

  if (!selectedBlog?.user.name) {
    return null;
  }

  return (
    <div>
      <h1>{selectedBlog.title}</h1>
      <p>
        {selectedBlog.url} <br />
        {selectedBlog.likes} likes{" "}
        <button onClick={() => updateLikesField(selectedBlog)}>like</button>{" "}
        <br />
        added by {selectedBlog.user.name}
      </p>
    </div>
  );
}

export default SingleBlog;
