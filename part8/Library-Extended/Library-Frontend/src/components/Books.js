import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return null;
  }

  const books = result?.data?.allBook;

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>s/n</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a, idx) => (
            <tr key={a.id}>
              <td>{idx + 1}</td>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
