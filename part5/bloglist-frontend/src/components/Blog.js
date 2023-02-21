import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, updateLikesField, deleteSingleBlog, user }) => {
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

  return (
    <div style={style}>
      <div className="visibleArea">
        <p>
          <span className="title" style={titleColor} onClick={toggleView}>
            Title: {blog.title}
          </span>
          {"  "}
          <button ref={buttonRef} onClick={toggleView}>
            view
          </button>
        </p>
      </div>
      <div style={toggleBlog} className="hiddenArea">
        <p>Url: {blog.url}</p>
        <div>
          <p>
            likes: <span ref={likesRef}>{blog.likes}</span>{" "}
            <button
              onClick={() => updateLikesField(blog, likesPatchObj, likesRef)}
              id="likeBtn"
            >
              like blog
            </button>
          </p>
        </div>
        <p>Author: {blog.author}</p>
        <button ref={removeBtnRef} onClick={() => deleteSingleBlog(blog)}>
          remove
        </button>
      </div>
    </div>
  );
};

Blog.displayName = "Blog";

Blog.propTypes = {
  updateLikesField: PropTypes.func.isRequired,
};

export default Blog;
