const TenCountries = ({ ten }) => {
  const makeTen = ten.slice(0, 10);
  console.log(makeTen);
  return (
    <div>
      {makeTen.map((country) => (
        <div key={country.name}>{country.name}</div>
      ))}
    </div>
  );
};

export default TenCountries;
