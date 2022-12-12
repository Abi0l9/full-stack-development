const PersonForm = ({ handleNewInput, handleSubmit, newName, newNumber }) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name="name" value={newName} onChange={handleNewInput} />
        </div>
        <div>
          number:
          <input name="number" value={newNumber} onChange={handleNewInput} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  );
};

export default PersonForm;
