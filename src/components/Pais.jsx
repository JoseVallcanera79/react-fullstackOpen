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
      axios
        .get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
        .then(response => {
          setCountry(response.data)
        })
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