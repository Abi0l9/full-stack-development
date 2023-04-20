import PropTypes from "prop-types";
import { Box, Link } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <Box
      sx={{
        padding: "10px",
        marginBottom: 1,
        backgroundColor: "lightgrey",
      }}
    >
      <span className="title">
        <Link underline="hover" color="black" href={`/blogs/${blog.id}`}>
          {blog.title}
        </Link>
      </span>
    </Box>
  );
};

Blog.displayName = "Blog";

Blog.propTypes = {
  updateLikesField: PropTypes.func.isRequired,
};

export default Blog;
