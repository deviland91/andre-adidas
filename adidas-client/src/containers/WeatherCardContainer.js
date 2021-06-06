import React, { useEffect, useState } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { toast } from "react-toastify"


import WeatherCard from '../components/weatherCard/weatherCard';
import DetailList from '../components/detailList/detailList';

const axios = require("axios")



const WeatherCardContainer = ({ city }) => {

  const [info, setInfo] = useState(null)
  const [currentDay, setCurrentDay] = useState(null)

  useEffect(() => {
    axios.get(`https://andre-adidas.herokuapp.com/api/getWeather`, { params: city })
      .then(response => {
        if (response.data.result == "success") {
          setInfo(response.data.weather[0])
        } else {
          toast.error("Cannot find weather for this city")
        }
      })
      .catch(error => {
        toast.error(error)
      })


  }, [city])

  const changeDay = (day) => {
    console.log("day: ", day)
    setCurrentDay(day)
  }

  return (
    <>
      <Grid item container xs={12}>
        {
          info?.daily.slice(0, 5).map((forecast) => {
            return (
              <Grid item xs={3} sm={2}>
                <WeatherCard forecast={forecast} setDay={changeDay} />
              </Grid>
            )
          })
        }
      </Grid>
      <Grid item container xs={12} style={{ paddingTop: "20px" }}>
        {currentDay &&
          <DetailList weather={info} day={currentDay} />
        }
      </Grid>
    </>
  )
}

export default WeatherCardContainer;