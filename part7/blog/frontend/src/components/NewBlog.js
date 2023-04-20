import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../reducers/blog";
import { newNotification } from "../reducers/notification";
import { Box, Button, TextField } from "@mui/material";

const NewBlog = ({ blogFormRef }) => {
  const blogs = useSelector((store) => store.blogs);
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState("");
  const [url, setUrl] = useState("");

  const handleBlogInput = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "author") {
      setAuthor(e.target.value);
    } else if (e.target.name === "likes") {
      setLikes(e.target.value);
    } else {
      setUrl(e.target.value);
    }
  };
  const clearInputFields = () => {
    setAuthor("");
    setLikes("");
    setTitle("");
    setUrl("");
  };

  const newBlogObj = { title, author, likes, url };

  const addNewBlog = async (e) => {
    e.preventDefault();

    try {
      dispatch(createBlog(newBlogObj, blogs));
      // newBlogMutation.mutate(newBlogObj);
      clearInputFields();

      blogFormRef.current.toggleVisibility();

      dispatch(
        newNotification({
          message: `A new blog ${newBlogObj.title} byyy ${newBlogObj.author} has been added`,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        newNotification({
          message: "Some fields are missing or Invalid Input",
          type: "error",
        })
      );
    }
  };

  return (
    <div>
      <form onSubmit={addNewBlog}>
        <Box className="testing" sx={{ margin: "0 auto", maxWidth: "70vw" }}>
          <h2>Add a new blog</h2>
          <Box>
            <TextField
              id="title"
              name="title"
              label="Blog Title"
              value={title}
              onChange={handleBlogInput}
              variant="standard"
              fullWidth
              data-testid="title"
              required
            />
          </Box>

          <Box>
            <TextField
              id="url"
              name="url"
              label="Blog Url"
              value={url}
              onChange={handleBlogInput}
              variant="standard"
              data-testid="url"
              fullWidth
              required
            />
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <TextField
                id="author"
                name="author"
                label="Blog Author"
                value={author}
                onChange={handleBlogInput}
                variant="standard"
                fullWidth
                data-testid="author"
                required
              />
            </Box>
            <Box>
              <TextField
                id="likes"
                name="likes"
                label="Blog Likes"
                value={likes}
                onChange={handleBlogInput}
                variant="standard"
                data-testid="url"
                fullWidth
                required
              />
            </Box>
          </Box>
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button type="submit" id="create" variant="contained">
              Create
            </Button>
            <Button
              onClick={() => blogFormRef.current.toggleVisibility()}
              type="button"
              id="cancel"
              variant="outlined"
              color="error"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </form>
    </div>
  );
};
export default NewBlog;
