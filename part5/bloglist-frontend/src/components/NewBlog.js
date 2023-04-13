import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blog";
import { newNotification } from "../reducers/notification";

const NewBlog = ({ blogFormRef }) => {
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
      await dispatch(createBlog(newBlogObj));
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
      <h2>Add a new blog</h2>
      <form onSubmit={addNewBlog}>
        <div className="testing">
          title:
          <input
            name="title"
            id="title"
            data-testid="title"
            value={title}
            onChange={handleBlogInput}
            placeholder="enter title of blog"
          />
        </div>
        <div>
          author:
          <input
            name="author"
            id="author"
            data-testid="author"
            value={author}
            onChange={handleBlogInput}
            placeholder="enter author's name"
          />
        </div>
        <div>
          url:
          <input
            name="url"
            data-testid="url"
            id="url"
            value={url}
            onChange={handleBlogInput}
            placeholder="https://..."
          />
        </div>
        <div>
          likes:
          <input
            name="likes"
            id="likes"
            data-testid="likes"
            value={likes}
            onChange={handleBlogInput}
            placeholder="number of likes"
          />
        </div>
        <button type="submit" id="create">
          create
        </button>
      </form>
    </div>
  );
};
export default NewBlog;
