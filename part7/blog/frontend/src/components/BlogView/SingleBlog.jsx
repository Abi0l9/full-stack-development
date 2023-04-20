import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMatch } from "react-router-dom";
import { Button, TextField, Box, Link } from "@mui/material";
import { createComment } from "../../reducers/blog";

function SingleBlog({ updateLikesField }) {
  const blogs = useSelector((state) => state.blogs);
  const dispatch = useDispatch();
  const [comment, setComment] = React.useState("");
  const match = useMatch("/blogs/:id");
  const selectedBlog =
    match && blogs.find((blog) => blog.id === match.params.id);

  if (!selectedBlog?.user.name) {
    return null;
  }

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const handleNewComment = (e, blogId) => {
    e.preventDefault();

    const newComment = { comment };
    dispatch(createComment(newComment, blogId, blogs));
    setComment("");
  };

  const handleSubmit = (e, blogId) => {
    handleNewComment(e, blogId);
  };

  return (
    <div>
      <h1>{selectedBlog.title}</h1>
      <p>
        {selectedBlog.url} <br />
        {selectedBlog.likes} likes{" "}
        <Button
          variant="outlined"
          size="small"
          onClick={() => updateLikesField(selectedBlog)}
        >
          like
        </Button>{" "}
        <br />
        added by
        <Link href={`/users/${selectedBlog.user.id}`} underline="hover">
          {" "}
          {selectedBlog.user.name}
        </Link>
      </p>
      <form onSubmit={(e) => handleSubmit(e, selectedBlog.id)}>
        <TextField
          label="Insert comment"
          id="comment"
          name="comment"
          value={comment}
          fullWidth
          multiline
          minRows={1}
          maxRows={4}
          variant="standard"
          onChange={handleChange}
          required
        />
        <br />
        <Box sx={{ marginTop: 1 }}>
          <Button type="submit" variant="contained" size="small">
            Submit
          </Button>
        </Box>
      </form>
      <h2>Comments</h2>
      {selectedBlog.comments.length
        ? selectedBlog.comments.map((comment, idx) => (
            <Box
              key={comment.id + idx}
              sx={{
                backgroundColor: "lightgray",
                color: "black",
                margin: "2px auto",
                padding: "4px",
              }}
            >
              {comment.comment} - Anonymous writer
            </Box>
          ))
        : "Be the first to comment..."}
    </div>
  );
}

export default SingleBlog;
