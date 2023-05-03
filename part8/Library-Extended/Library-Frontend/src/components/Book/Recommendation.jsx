import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ME } from "../../queries";

const Recommendation = (props) => {
  const { data } = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });
  const user = useQuery(ME, {
    pollInterval: 2000,
  });
  const favoriteGenre = user?.data?.me?.favoriteGenre;

  const books = data?.allBook?.filter((book) =>
    book.genres.includes(favoriteGenre)
  );

  if (!props.show) {
    return null;
  }
  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        books in your favorite genre <b>{favoriteGenre}</b>
      </div>

      {!books.length ? (
        <p>This list is empty for now... </p>
      ) : (
        <table>
          <tbody>
            <tr>
              <th>s/n</th>
              <th>title</th>
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
      )}
    </div>
  );
};

export default Recommendation;
