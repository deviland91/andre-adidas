import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import moment from "moment"
import './detailList.scss';

const DetailList = ({ weather, day }) => {



  return (
    <>
      {weather?.daily.find(findDay => {
        return findDay.date == day
      })?.hourly.slice(0, 12).map((forecast) => {
        return (
          <Paper elevation={1} className="detailClass">
            <Grid container spacing={2} style={{ padding: "4px" }}>
              <Grid item xs={12}>
                <Typography>
                  {moment(forecast.hour).format("MMM Do")}
                </Typography>
                <Typography>
                  {moment(forecast.hour).format("HH:mm")}
                </Typography>

              </Grid>

              <Grid item xs={12}>
                <img width="50px" src={`/images/icons/${forecast.icon}.png`} />
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">
                  Temp: {forecast.temp}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="caption">
                  Wind: {forecast.wind}
                </Typography>
              </Grid>
              <Grid item xs={12} >
                <Typography variant="caption" >
                  Rain Prob:
                </Typography>
                <Typography component="div" variant="caption" >
                  {forecast.precipProb}%
                </Typography>
              </Grid>
            </Grid>
          </Paper>)
      })
      }
    </>
  );

}

export default DetailList;