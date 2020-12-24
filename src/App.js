import React, { useState, useEffect } from 'react'
import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core'
import InfoBox from './InfoBox';
import MyMap from './Map'
import Table from './Table'
import { sortData } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState(['USA', 'China', 'England']);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState("cases");


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

          const sortedData = sortData(data);
          setTableData(sortedData)
          setCountries(countries)
          setMapCountries(data)
        })
    }
    getCountriesData()
  }, [])


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
        setCountryInfo(data);
        setCountry(countryCode);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(5);
      })
  }




  return (
    <div className="app">
      <div className="app__left">
        {/* header */}
        <div className="app__header">
          <h1>COVID-19 Tracker</h1>
          {/* title + select input dropdown field */}
          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country}
              onChange={onCountryChange} style={{ backgroundColor: "tomato", color: "#fff", borderColor: "none" }}
            >
              <MenuItem value="worldwide" >Worldwide</MenuItem>
              {/* loop through countries */}
              {
                countries.map((country, i) => (
                  <MenuItem key={i} value={country.value}>{country.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <h2 style={{ width: '100%' }}>Today's update! </h2>

        {/* 3 info boxes */}
        <div className="app__stats">
          <br></br>
          <InfoBox title="Covid Cases" total={countryInfo.cases} cases={countryInfo.todayCases} onClick={(e) => setCasesType("cases")} />
          <InfoBox title="Recovered" total={countryInfo.recovered} cases={countryInfo.todayRecovered} onClick={(e) => setCasesType("recovered")} />
          <InfoBox title="Death" total={countryInfo.deaths} cases={countryInfo.todayDeaths} onClick={(e) => setCasesType("deaths")} />
        </div>
        {/* map */}
        <MyMap center={mapCenter} zoom={mapZoom} countries={mapCountries} casesType={casesType} />
      </div>
      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by country</h3>
          {/* table */}
          <Table countries={tableData} />
          <br></br>
          <h3>Worldwide new cases</h3>
          <br></br>
          {/* graph */}
          <LineGraph />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
