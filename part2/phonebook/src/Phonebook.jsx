const Phonebook = ({ search, handleSearch }) => {
  return (
    <span>
      Filter shown with
      <input type="text" value={search} onChange={handleSearch} />
    </span>
  );
};

export default Phonebook;
