import React, { useState } from 'react'
import './App.css';
import { FormControl, Select, MenuItem } from '@material-ui/core'


function App() {
  const [countries, setCountries] = useState(['USA', 'China', 'England']);

  return (
    <div className="app">
      {/* header */}
      <div className="app__header">
        <h1>COVID-19 Tracker</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value="abc">
            {/* loop through countries */}
            {
              countries.map(country => (
                <MenuItem value={country}>{country}</MenuItem>
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
