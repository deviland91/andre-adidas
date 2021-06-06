const express = require("express")
const axios = require("axios")
const router = express.Router()
const admin = require('firebase-admin');

const db = admin.firestore();

const dbWeather = async (city, country) => {
  const cityRef = db.collection("cities").where("city", "==", city).where("country", "==", country)

  const getCity = await cityRef.get()

  if (getCity?._size > 0) {

    const allWeatherData = await db.collection("weather").where("city", "==", getCity._docs()[0]._ref).get()

    if (allWeatherData._size > 0) {

      var weatherArray = allWeatherData._docs().map(weather => {
        return weather.data()
      })
      return { result: "success", weather: weatherArray }
    } else {
      return { result: "error", message: "Weather does not exist" }
    }

  } else {
    return { result: "error", message: "City does not exist" }
  }

}



router.get("/", async (req, res, next) => {
  const { city, country } = req.query
  const weatherData = await dbWeather(city, country)
  console.log("weather: ", weatherData)
  if (weatherData.result == "error") {
    res.statusCode = 404;
    res.send(JSON.stringify(weatherData))
  } else {
    res.statusCode = 200;
    res.send(JSON.stringify(weatherData))
  }

})

module.exports = router