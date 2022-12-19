import OneCountry from "./OneCountry";
import TenCountries from "./TenCountries";

const Countries = ({ countries, input, setInput }) => {
  const allCountries = countries
    .filter((country) =>
      country.name.common.toLowerCase().includes(input.toLowerCase())
    )
    .map((country) => {
      return {
        name: country.name.common,
        capital: country.capital,
        area: country.area,
        flagUrl: country.flags.png,
        lang: country.languages,
        lat: country.latlng[0],
        lng: country.latlng[1],
      };
    });

  return (
    <div>
      {allCountries.length > 1 ? (
        <TenCountries ten={allCountries} setInput={setInput} />
      ) : allCountries.length < 1 ? (
        "No result found!"
      ) : (
        <OneCountry one={allCountries} input={input} />
      )}
    </div>
  );
};

export default Countries;
