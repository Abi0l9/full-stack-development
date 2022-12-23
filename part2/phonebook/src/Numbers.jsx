const Numbers = ({ persons, search }) => {
  return (
    <div>
      <h2>Numbers</h2>
      {persons
        .filter((person) =>
          person.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        )
        .map((person) => (
          <div key={person.name + " " + person.id}>
            {person.name} {person.number}
          </div>
        ))}
    </div>
  );
};
export default Numbers;
