import React, { useState, useEffect } from 'react'
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import InfoBox from './InfoBox';
import Map from './Map'
import Table from './Table'

function App() {
  const [countries, setCountries] = useState(['USA', 'China', 'England']);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    setCountry(countryCode)

    //https://disease.sh/v3/covid-19/all
    //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    const url = countryCode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }


  //first load for worldwide data
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data)
      })
  }, [])


  // select country
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
          setTableData(data)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  return (
    <div className="app">
      <div className="app__left">
        {/* header */}
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          {/* title + select input dropdown field */}
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

        {/* 3 info boxes */}
        <div className="app__stats">
          <InfoBox title="Covid Cases" total={countryInfo.cases} cases={countryInfo.todayCases} />
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} />
          <InfoBox title="Death" total={countryInfo.deaths} cases={countryInfo.todayDeaths} />
        </div>
        {/* map */}
        <Map />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country</h3>
          {/* table */}
          <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
          {/* graph */}
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
