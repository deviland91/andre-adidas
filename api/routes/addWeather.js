const express = require("express")
const router = express.Router()
const admin = require('firebase-admin');

const db = admin.firestore();

const newWeather = async (city, country, daily) => {
  if (!city || city.length === 0) {
    return { result: "error", message: "City cannot be empty" }
  } else if (!country || country.length === 0) {
    return { result: "error", message: "Country cannot be empty" }
  }
  const cityRef = db.collection("cities").where("city", "==", city).where("country", "==", country)

  const getCity = await cityRef.get()

  if (getCity?._size > 0) {


    const allWeatherData = db.collection("weather").where("city", "==", getCity._docs()[0]._ref)
    const weatherDoc = await allWeatherData.get()

    if (weatherDoc._size > 0) {
      const addDoc = await db.collection('weather').doc(weatherDoc._docs()[0].id).set({
        city: getCity._docs()[0]._ref,
        daily: daily
      })
      return { result: "success", doc: addDoc }
    } else {
      const addDoc = await db.collection('weather').add({
        city: getCity._docs()[0]._ref,
        daily: daily
      })
      return { result: "success", doc: addDoc }
    }


  } else {
    return { result: "error", message: "City does not exist" }
  }

}

router.post("/", async (req, res, next) => {

  const { city, country } = req.query
  const daily = req.body

  var changeResult
  try {
    changeResult = await newWeather(city, country, daily)
    if (changeResult.result == "error") {
      res.statusCode = 500;
      res.send(JSON.stringify(changeResult))
    } else {
      res.statusCode = 200;
      res.send(JSON.stringify(changeResult))
    }
  } catch (error) {
    res.statusCode = 404;
    res.send(JSON.stringify(error))
  }
})

module.exports = router