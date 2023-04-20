import { Box, Link } from "@mui/material";
import { useSelector } from "react-redux";
import { useMatch } from "react-router-dom";

const User = () => {
  const blogs = useSelector((state) => state.blogs);
  const match = useMatch("/users/:id");
  const selectedUser =
    match && blogs.filter((blog) => blog.user.id === match.params.id);

  if (!selectedUser.at(0)?.user) {
    return null;
  }

  return (
    <div>
      {
        <div>
          <h2>Author: {selectedUser.at(0).user.name}</h2>
          <h4>added blogs</h4>
          {selectedUser.map((blog) => (
            <Box key={blog.id}>
              <Box
                sx={{
                  backgroundColor: "lightgray",
                  color: "black",
                  margin: "2px auto",
                  padding: "4px",
                }}
              >
                <Link
                  underline="hover"
                  color="black"
                  href={`/blogs/${blog.id}`}
                >
                  {blog.title}
                </Link>
              </Box>
            </Box>
          ))}
        </div>
      }
    </div>
  );
};

export default User;
