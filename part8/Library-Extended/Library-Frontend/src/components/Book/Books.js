import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../../queries";
import { useEffect, useState } from "react";
import BooksByGenres from "./BooksByGenres";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [booksByGenres, setbooksByGenres] = useState([]);
  const result = useQuery(ALL_BOOKS, {
    pollInterval: 2000,
  });

  const books = result?.data?.allBook;

  useEffect(() => {
    if (books) {
      const gensList = [
        ...new Set(
          books
            .map((book) => book.genres)
            .reduce((arr, el) => arr.concat(el), [])
        ),
      ];
      setGenres(gensList);
    }
  }, [books]);

  useEffect(() => {
    if (selectedGenre) {
      const filteredBooks = books.filter((book) =>
        book.genres.includes(selectedGenre)
      );

      setbooksByGenres(filteredBooks);
    }
  }, [books, selectedGenre]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return null;
  }

  return (
    <div>
      <h2>books</h2>
      {selectedGenre !== "all" ? (
        <BooksByGenres books={booksByGenres} selectedGenre={selectedGenre} />
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
      {genres?.map((genre) => (
        <span key={genre}>
          <button onClick={() => setSelectedGenre(genre)}>{genre}</button>
        </span>
      ))}
      <button onClick={() => setSelectedGenre("all")}>all genres</button>
    </div>
  );
};

export default Books;
