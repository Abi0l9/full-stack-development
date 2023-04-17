import { useSelector } from "react-redux";
import { useMatch, useNavigate } from "react-router-dom";

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
          <h2>{selectedUser.at(0).user.name}</h2>
          <h4>added blogs</h4>
          {selectedUser.map((blog) => (
            <ul key={blog.id}>
              <li>{blog.title}</li>
            </ul>
          ))}
        </div>
      }
    </div>
  );
};

export default User;
