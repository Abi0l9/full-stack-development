import { useState } from "react";
const NewBlog = ({ handleBlogSubmit }) => {
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
  const addNewBlog = (e) => {
    e.preventDefault();
    handleBlogSubmit(newBlogObj);
    clearInputFields();
  };

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addNewBlog}>
        <div className="testing">
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
        <button type="submit">create</button>
      </form>
    </div>
  );
};
export default NewBlog;
