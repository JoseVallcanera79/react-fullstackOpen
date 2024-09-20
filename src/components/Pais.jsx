import { useState, useEffect } from 'react'
import axios from 'axios'


const Pais = () => {
  const [value, setValue] = useState('');
  const [country, setCountry] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(name.toLowerCase())
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
        </div>
      )}
    </div>
  );
};

export default Pais;
