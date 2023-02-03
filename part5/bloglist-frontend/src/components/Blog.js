import { useRef, useState } from "react";

const Blog = ({ blog }) => {
  const [display, setDisplay] = useState(false);

  const toggleBlog = { display: display ? "" : "none" };
  const titleColor = { backgroundColor: display ? "yellow" : "" };
  const buttonRef = useRef(null);

  const style = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleView = () => {
    if (display) {
      buttonRef.current.textContent = "view";
    } else {
      buttonRef.current.textContent = "hide";
    }
    setDisplay(!display);
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
            likes {blog.likes} <button>like</button>
          </p>
        </div>
        <p>{blog.author}</p>
      </div>
    </div>
  );
};

export default Blog;
