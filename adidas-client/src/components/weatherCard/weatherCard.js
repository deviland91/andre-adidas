import React from 'react';
import { Grid, Paper, Typography } from '@material-ui/core';
import moment from "moment"
import "./weatherCard.scss";

const WeatherCard = ({ forecast, setDay, classname }) => {


  return (
    <Paper elevation={1} className={`mainCard ${classname}`} onClick={() => setDay(forecast.date)}>
      <Grid container spacing={1} className="cardInner">
        <Grid item xs={12}>
          <Typography>
            {moment(forecast.date).format("ddd")}
          </Typography>
          <Typography>
            {moment(forecast.date).format("MMM Do")}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <img width="70px" src={`/images/icons/${forecast.icon}.png`} />
        </Grid>
        <Grid item xs={7}>
          <Typography>
            Máx:
          </Typography>
          <Typography>
            {forecast.maxTemp}Cº
          </Typography>
        </Grid>
        <Grid item xs={5}>
          <Typography>
            Min:
          </Typography>
          <Typography>
            {forecast.minTemp}Cº
          </Typography>
        </Grid>
        <Grid item xs={12}>
          Rain Prob: {forecast.precipProb}%
        </Grid>
      </Grid>
    </Paper>
  );
}

export default WeatherCard;