import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import DetailList from '../components/detailList/detailList';
import WeatherCard from '../components/weatherCard/weatherCard';



const axios = require("axios")



const WeatherCardContainer = ({ city }) => {

  const [info, setInfo] = useState(null)
  const [currentDay, setCurrentDay] = useState(null)

  useEffect(() => {
    city.type = "single"
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

  }, [city.city])
  const changeDay = (day) => {
    setCurrentDay(day)
  }

  return (
    <>
      <Grid item container xs={12}>
        {info?.daily.slice(0, 5).map((forecast) => {
            return (
              <Grid item xs={6} sm={4} md={3} lg={2} >
                <WeatherCard classname={`${forecast.date == currentDay ? "selected" : ""}`} forecast={forecast} setDay={changeDay} />
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