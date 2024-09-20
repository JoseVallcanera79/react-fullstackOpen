import { useState, useEffect } from 'react'
import axios from 'axios'

const Pais = () => {
  const [value, setValue] = useState('')
  const [country, setCountry] = useState({})
  const [name, setName] = useState(null)

  useEffect(() => {
    console.log('effect run, currency is now', name)

    // omitir si el pais no está definido
    if (name) {
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
        .then(response => {
          const filteredCountries = response.data.filter(country =>
            country.name.common.toLowerCase().includes(name.toLowerCase())
          );

          if (filteredCountries.length > 10) {
            setCountry({ error: 'Demasiados países encontrados. Por favor, especifica más.' });
          } else if (filteredCountries.length > 1) {
            setCountry(filteredCountries);
          } else if (filteredCountries.length === 1) {
            const countryData = filteredCountries[0];
            setCountry({
              name: countryData.name.common,
              capital: countryData.capital[0],
              area: countryData.area,
              flag: countryData.flags.png,
              languages: Object.values(countryData.languages).join(', '),
            });
          } else {
            setCountry({ error: 'No se encontró el país.' });
          }
        })
        .catch(error => console.error('Error al buscar países:', error));
    }


  }, [name])

  const handleChange = (event) => {
    setValue(event.target.value)
  }

  const onSearch = (event) => {
    event.preventDefault()
    setName(value)
  }

  return (
    <div>
      <form onSubmit={onSearch}>
        Pais: <input value={value} onChange={handleChange} />
        <button type="submit">exchange country</button>
      </form>
      
      {country.name && (
        <div>
          <h2>{country.name}</h2>
          <p>Capital: {country.capital}</p>
          <p>Área: {country.area} km²</p>
          <p>Idiomas: {country.languages}</p>
          <img src={country.flag} alt={`Bandera de ${country.name}`} width="100" />
        </div>
      )}

      <pre>
        {JSON.stringify(country, name, 2)}
      </pre>
    </div>
  )
}

export default Pais