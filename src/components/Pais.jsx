import { useState, useEffect } from 'react';
import axios from 'axios';

const Pais = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [weather, setWeather] = useState(null); // Para guardar el clima
  const [name, setName] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  const fetchWeather = (city) => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=es`)
      .then(response => {
        setWeather(response.data); // Guardar los datos del clima
      })
      .catch(error => console.error('Error:', error));
  };

  useEffect(() => {
    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(name.trim().toLowerCase()) ||
            country.translations.spa.common.toLowerCase().includes(name.trim().toLowerCase())
            
          );

          if (filteredCountries.length > 10) {
            setCountry({ error: 'Demasiados países encontrados. Por favor, especifica más.' });
          } else {
            setCountry(filteredCountries);
          }
        })
        .catch(error => console.error('Error al buscar países:', error));
    }
  }, [name]);

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const onSearch = (event) => {
    event.preventDefault();
    setName(value);
  };

  const showCountryDetails = (country) => {
    setSelectedCountry(country);
    fetchWeather(country.capital[0]); // Buscar clima basado en la capital del país
  };

  return (
    <div>
      <form onSubmit={onSearch}>
        País: <input value={value} onChange={handleChange} />
        <button type="submit">Buscar país</button>
      </form>

      {Array.isArray(country) && country.length > 1 && (
        <ul>
          {country.map((c, index) => (
            <li key={index}>
              {c.name.common}
              <button onClick={() => showCountryDetails(c)}>Mostrar</button>
            </li>
          ))}
        </ul>
      )}

      {selectedCountry && (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital[0]}</p>
          <p>Área: {selectedCountry.area} km²</p>
          <p>Idiomas: {Object.values(selectedCountry.languages).join(', ')}</p>
          <img src={selectedCountry.flags.png} alt={`Bandera de ${selectedCountry.name.common}`} width="100" />

          {weather && (
            <div>
              <h3>Clima en {selectedCountry.capital[0]}</h3>
              <p>Temperatura: {weather.main.temp}°C</p>
              <p>Clima: {weather.weather[0].description}</p>
              <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="Icono del clima" />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Pais;
