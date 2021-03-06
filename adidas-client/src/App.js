import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab'
import fetch from "unfetch"
import logo from './logo.svg';
import './App.css';
import { toast } from "react-toastify"
import WeatherCardContainer from './containers/WeatherCardContainer';

const axios = require("axios")


const App = () => {

  const [searchCity, setSearchCity] = useState(null)
  const [cities, setCities] = useState([])

  useEffect(() => {
    axios.get(`https://andre-adidas.herokuapp.com/api/getCities`)
      .then(response => {

        if (response.data.result == "success") {
          setCities(response.data.cities)
        } else {
          toast.error(response.data.message)
        }

      })
      .catch(error => {
        toast.error(error)
      })
  }, [searchCity])

  return (
    <Grid container className="App" spacing={3}>
      <Grid item xs={12} sm={7}>
        <Typography variant="h2" style={{ textAlign: "left" }}>
          All new Weather App
        </Typography>
      </Grid>

      <Grid item xs={12} sm={5} style={{ textAlign: "left", alignSelf: "center" }}>
        <Autocomplete
          value={searchCity}
          id="combo-box-demo"
          options={cities}
          getOptionLabel={(option) => option.city + ", " + option.country}
          style={{ width: 250 }}
          renderInput={(params) => <TextField {...params} label="City Search" variant="outlined" />}
          onChange={(event, newValue) => {
            setSearchCity(newValue)
          }}

        />
      </Grid>

      {searchCity &&
        <Grid item container style={{ maxWidth: "900px" }}>
          <WeatherCardContainer city={searchCity} />
        </Grid>
      }
    </Grid>
  );
}

export default App;
