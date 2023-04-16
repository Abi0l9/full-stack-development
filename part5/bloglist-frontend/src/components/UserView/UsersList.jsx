import React from "react";
import { useSelector } from "react-redux";

function UsersList() {
  const blogs = useSelector((state) => state.blogs);
  const list = blogs
    ?.map((blog) => blog.user.name)
    .reduce((obj, item) => {
      obj[item] = obj[item] ? (obj[item] += 1) : (obj[item] = 1);
      return obj;
    }, {});

  const usersBlogs = Object.entries(list).map(([user, blogs]) => {
    return {
      user,
      blogs,
    };
  });

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              <h4>blogs created</h4>
            </th>
          </tr>
          {usersBlogs?.map(({ user, blogs }) => (
            <tr key={user}>
              <td>{user}</td>
              <td>{blogs}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UsersList;
