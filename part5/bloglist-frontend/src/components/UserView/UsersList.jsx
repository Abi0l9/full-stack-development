import React from "react";
import { useSelector } from "react-redux";
import Notification from "../Notification";
import { groupBlogsByAuthor } from "../../utils";
import { Link, useMatch } from "react-router-dom";

function UsersList({ user, handleLogout }) {
  const blogs = useSelector((state) => state.blogs);
  const groupedBlogs = groupBlogsByAuthor(blogs);

  return (
    <div>
      <h2>Users</h2>
      <Notification />
      <div>
        <strong>{user.name}</strong> logged in!
        <button onClick={handleLogout}>Logout</button>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <h4>blogs created</h4>
            </th>
          </tr>
          {groupedBlogs?.map(({ author, id, blogsNum }) => (
            <tr key={id}>
              <td>
                <Link to={`/users/${id}`}>{author}</Link>
              </td>
              <td>{blogsNum}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
