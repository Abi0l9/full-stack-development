const BooksByGenres = ({ selectedGenre, books }) => {
  return (
    <div>
      <div>
        in genre <b>{selectedGenre}</b>
      </div>
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
    </div>
  );
};

export default BooksByGenres;
