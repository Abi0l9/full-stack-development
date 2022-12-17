import Countries from "./Countries";

const RandomCountry = ({ countries }) => {
  const random = Math.ceil(Math.random() * countries.length);
  const selected = countries[random];

  console.log(selected);

  return (
    <div>
      <h1>{random}</h1>
    </div>
  );
};

export default RandomCountry;
