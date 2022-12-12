const Phonebook = ({ search, handleSearch }) => {
  return (
    <div>
      <div>
        Filter shown with
        <input type="text" value={search} onChange={handleSearch} />
      </div>
    </div>
  );
};

export default Phonebook;
