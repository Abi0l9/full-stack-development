import { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({
  setNotification,
  clearNotification,
  blog,
  setBlogs,
  blogs,
  user,
}) => {
  const [display, setDisplay] = useState(false);

  const toggleBlog = { display: display ? "" : "none" };
  const titleColor = { backgroundColor: display ? "yellow" : "" };
  const buttonRef = useRef(null);
  const likesRef = useRef(null);
  const removeBtnRef = useRef(null);
  let [likes, setLikes] = useState(null);
  const { username } = user;

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    setLikes(Number(likesRef.current.textContent));
    if (username !== blog.user?.username) {
      removeBtnRef.current.hidden = "true";
    }
  }, [username, blog.user?.username]);

  const toggleView = () => {
    if (display) {
      buttonRef.current.textContent = "view";
    } else {
      buttonRef.current.textContent = "hide";
    }
    setDisplay(!display);
  };

  const likesPatchObj = { likes: likes };

  const updateLikesField = async () => {
    const blogId = blog.id;
    try {
      likesPatchObj.likes += 1;
      const newObj = { likes: String(likesPatchObj.likes) };
      likesRef.current.textContent = newObj.likes;

      await blogService.updateLikes(blogId, newObj);
      //update likes field immediately
    } catch (error) {
      console.log(error.message);
    }
  };

  const deleteSingleBlog = async () => {
    const blogId = blog.id;
    const blogIdx = blogs.findIndex((blog) => blog.id === blogId);
    const message = `Remove blog ${blog.title} by ${blog.author}`;

    if (window.confirm(message)) {
      try {
        await blogService.deleteBlog(blogId);
        blogs.splice(blogIdx, 1);
        setBlogs([...blogs]);
        setNotification({ message: "Deleted successfully!", type: "success" });
        clearNotification();
      } catch (error) {
        console.log(error.message);
        setNotification({ message: "Oops...an error occurred", type: "error" });
        clearNotification();
      }
    }
  };

  return (
    <div style={style}>
      <div>
        <p>
          <span style={titleColor} onClick={toggleView}>
            {blog.title}
          </span>
          {"  "}
          <button ref={buttonRef} onClick={toggleView}>
            view
          </button>
        </p>
      </div>
      <div style={toggleBlog}>
        <p>{blog.url}</p>
        <div>
          <p>
            likes <span ref={likesRef}>{blog.likes}</span>{" "}
            <button onClick={updateLikesField}>like</button>
          </p>
        </div>
        <p>{blog.author}</p>
        <button ref={removeBtnRef} onClick={deleteSingleBlog}>
          remove
        </button>
      </div>
    </div>
  );
};

export default Blog;
