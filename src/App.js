import React, { useState, useEffect } from 'react'
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'


function App() {
  const [countries, setCountries] = useState(['USA', 'China', 'England']);
  const [country, setCountry] = useState("worldwide");

  const onCountryChange = (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode)
  }

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then(response => response.json())
        .then(data => {
          const countries = data.map(country => (
            {
              name: country.country, //only pick country name and UK from the big object
              value: country.countryInfo.iso2
            }
          ))
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  return (
    <div className="app">
      {/* header */}
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country}
            onChange={onCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {/* loop through countries */}
            {
              countries.map((country, i) => (
                <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>


      {/* title + select input dropdown field */}

      {/* 3 info boxes */}

      {/* table */}
      {/* graph */}


      {/* map */}
    </div>
  );
}

export default App;
