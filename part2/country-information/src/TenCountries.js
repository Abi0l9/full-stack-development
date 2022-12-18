import { useEffect, useState } from "react";

const TenCountries = ({ ten, input }) => {
  const makeTen = ten.slice(0, 10);
  const [toggle, setToggle] = useState(false);
  const [clicked, setClicked] = useState("");
  let [selected, setSelected] = useState("");

  let languages = selected ? Array.from(Object.values(selected.lang)) : "";

  const handleClick = (event) => {
    setClicked(event.target.name);
    setToggle(!toggle);
  };

  useEffect(() => {
    let result = makeTen.filter((country) => clicked === country.name);
    setSelected(result[0]);
  }, [clicked, makeTen]);

  return (
    <div>
      {!toggle &&
        makeTen.map((country, id) => (
          <div key={id}>
            <span key={country.name}> {country.name}</span>
            <button
              onClick={handleClick}
              name={country.name}
              key={country.area}
            >
              show
            </button>
          </div>
        ))}

      {selected && (
        <div>
          <h1>{selected.name}</h1>
          capital: {selected.capital}
          <div>area: {selected.area}</div>
          <br />
          <h3>languages</h3>
          <ul>
            {languages.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <br />
            <img src={selected.flagUrl} alt={selected.name + " flag"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TenCountries;
