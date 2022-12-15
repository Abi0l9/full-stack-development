const TenCountries = ({ ten }) => {
  const makeTen = ten.slice(0, 10);
  console.log(makeTen);
  return (
    <div>
      {makeTen.map((country) => (
        <div>
          <span key={country.name}> {country.name}</span>
          <button>show</button>
        </div>
      ))}
    </div>
  );
};

export default TenCountries;
