import { useState } from "react";
import blogService from "../services/blogs";

const NewBlog = ({ setNotification, clearNotification, setBlogs, blogs }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [likes, setLikes] = useState("");
  const [url, setUrl] = useState("");

  const clearInputFields = () => {
    setAuthor("");
    setLikes("");
    setTitle("");
    setUrl("");
  };

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

  const newBlogObj = { title, author, likes, url };

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    // blogFormRef.current.toggleVisibilty();
    try {
      const blog = await blogService.addBlog(newBlogObj);
      newBlogObj.id = blog.id;
      setBlogs(blogs.concat(newBlogObj));

      clearInputFields();
      clearNotification();
      setNotification({
        message: `A new blog ${newBlogObj.title} by ${newBlogObj.author} has been added`,
        type: "success",
      });
    } catch (error) {
      clearInputFields();
      clearNotification();
      console.log(error.message);
      setNotification({
        message: "Some fields are missing or Invalid Input",
        type: "error",
      });
    }
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          title:
          <input name="title" value={title} onChange={handleBlogInput} />
        </div>
        <div>
          author:
          <input name="author" value={author} onChange={handleBlogInput} />
        </div>
        <div>
          url:
          <input name="url" value={url} onChange={handleBlogInput} />
        </div>
        <div>
          likes:
          <input name="likes" value={likes} onChange={handleBlogInput} />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};
export default NewBlog;
