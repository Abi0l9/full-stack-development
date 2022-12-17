const TenCountries = ({ ten }) => {
  const makeTen = ten.slice(0, 10);
  return (
    <div>
      {makeTen.map((country, id) => (
        <div>
          <span key={country.name}> {country.name}</span>
          <button key={id}>show</button>
        </div>
      ))}
    </div>
  );
};

export default TenCountries;
