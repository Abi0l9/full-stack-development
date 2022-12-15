import OneCountry from "./OneCountry";
import TenCountries from "./TenCounties";

const Countries = ({ countries, input }) => {
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
      };
    });
  return (
    <div>
      {allCountries.length > 1 ? (
        <TenCountries ten={allCountries} />
      ) : (
        <OneCountry one={allCountries} />
      )}
    </div>
  );
};

export default Countries;
