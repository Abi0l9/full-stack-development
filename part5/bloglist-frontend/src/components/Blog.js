import { useEffect, useRef, useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog }) => {
  const [display, setDisplay] = useState(false);

  const toggleBlog = { display: display ? "" : "none" };
  const titleColor = { backgroundColor: display ? "yellow" : "" };
  const buttonRef = useRef(null);
  const likesRef = useRef(null);
  let [likes, setLikes] = useState(null);

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  useEffect(() => {
    setLikes(Number(likesRef.current.textContent));
  }, []);

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
      </div>
    </div>
  );
};

export default Blog;
