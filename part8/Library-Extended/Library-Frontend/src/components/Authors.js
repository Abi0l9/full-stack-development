import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import { Box } from "@mui/material";
import EditAuthor from "./EditAuthor";

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS, {
    pollInterval: 2000,
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return null;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.booksCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Box sx={{ mt: 2 }}>
        {props.token && <EditAuthor authors={authors} />}
      </Box>
    </div>
  );
};

export default Authors;
