import { useEffect, useState } from "react";

const RandomCountry = ({ countries }) => {
  const [selected, setSelected] = useState();

  useEffect(() => {
    const random = Math.ceil(Math.random() * countries.length);
    const randCountry = countries[random];
    setSelected(randCountry);
  }, [countries]);
  let { name, capital, area, flags, languages } = selected ? selected : "";
  let lang = selected ? Array.from(Object.values(languages)) : { dummy: "" };
  return (
    <div>
      <h1>Country of the day</h1>
      {selected && (
        <div>
          <h2>{name.common}</h2>
          <div>capital: {capital}</div>
          <div>area: {area}</div>
          <br />
          <br />
          <h3>languages</h3>
          <ul>
            {lang.map((language) => (
              <li key={language}>{language}</li>
            ))}
          </ul>
          <div>
            <br />
            <img src={flags.png} alt={name + " flag"} />
          </div>
        </div>
      )}
    </div>
  );
};

export default RandomCountry;
