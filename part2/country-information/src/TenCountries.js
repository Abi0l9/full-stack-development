import { useEffect, useState } from "react";
import axios from "axios";

const TenCountries = ({ ten, setInput }) => {
  const api_key = process.env.REACT_APP_NOT_SECRET_CODE;
  const makeTen = ten.slice(0, 10);
  const [toggle, setToggle] = useState(false);
  const [clicked, setClicked] = useState("");
  let [selected, setSelected] = useState("");
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [getWeather, setGetWeather] = useState({
    main: "",
    wind: "",
    weather: "",
  });

  let languages = selected ? Array.from(Object.values(selected.lang)) : "";

  const handleClick = (event) => {
    setClicked(event.target.name);
    setToggle(!toggle);
    setCoords({
      ...coords,
      lat: event.target.dataset.lat,
      lng: event.target.dataset.lng,
    });
  };

  useEffect(() => {
    let result = makeTen.filter((country) => clicked === country.name);
    setSelected(result[0]);
  }, [clicked, makeTen]);

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&appid=${api_key}&units=metric`
      )
      .then((response) => setGetWeather(response.data));
  }, [coords.lat, coords.lng, api_key]);

  let { main, wind, weather, name } = getWeather ? getWeather : "";
  const weatherIcon = weather ? weather[0].icon : "";

  return (
    <div>
      {!toggle &&
        makeTen.map((country, id) => (
          <div key={id}>
            <span key={country.name}> {country.name}</span>
            <button
              onClick={handleClick}
              name={country.name}
              data-lng={country.lng}
              data-lat={country.lat}
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
      {selected && (
        <div>
          <h2>Weather in {name}</h2>
          <p>temperature {main.temp} Celcius</p>
          <img
            src={`http://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
            alt={weatherIcon + "icon"}
          />
          <p>wind {wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default TenCountries;
