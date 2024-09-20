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
      console.log('Nuevo pais', name)
      if (name) {
        console.log('Buscando países que coincidan con:', name);
        axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
          .then(response => {
            const filteredCountries = response.data.filter(country => 
              country.name.common.toLowerCase().includes(name.toLowerCase())
            );
            
            console.log('Países encontrados:', filteredCountries);
      
            if (filteredCountries.length > 10) {
              setCountry({ error: 'Demasiados países encontrados. Por favor, especifica más.' });
            } else if (filteredCountries.length > 1) {
              setCountry(filteredCountries); // Muestra todos los países si hay entre 2 y 10 resultados
            } else {
              setCountry(filteredCountries[0]); // Solo un país, muestra ese directamente
            }
          })
          .catch(error => console.error('Error al buscar países:', error));
      }
      
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
      <pre>
        {JSON.stringify(country, null, 2)}
      </pre>
    </div>
  )
}

export default Pais