const OneCountry = ({ one }) => {
  const { name, capital, area, flagUrl, lang } = one[0];
  const languages = Array.from(Object.values(lang));

  return (
    <div>
      <h1>{name}</h1>
      <div>capital: {capital}</div>
      <div>area: {area}</div>
      <br />
      <br />
      <h3>languages</h3>
      <ul>
        {languages.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <div>
        <br />
        <img src={flagUrl} alt={name + " flag"} />
      </div>
    </div>
  );
};

export default OneCountry;
