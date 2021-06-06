const express = require("express")
const router = express.Router()
const admin = require('firebase-admin');

const db = admin.firestore();

const delWeather = async (city, country, type) => {
  if ((!city || city.length === 0) && type != "all") {
    return { result: "error", message: "City cannot be empty" }
  } else if ((!country || country.length === 0) && type != "all") {
    return { result: "error", message: "Country cannot be empty" }
  }

  if (type == "all") {
    const weatherRef = await db.collection("weather").get()

    if (weatherRef._size > 0) {
      const deletedWeather = weatherRef._docs().map(weather => {
        return weather._ref.delete()
      })
      return { result: "success", doc: deletedWeather }
    }
    else {
      return { result: "error", message: "This city does not have weather" }
    }
  } else if (type == "single") {
    const cityRef = db.collection("cities").where("city", "==", city).where("country", "==", country)

    const getCity = await cityRef.get()

    if (getCity?._size > 0) {

      const weatherRef = await db.collection("weather").where("city", "==", getCity._docs()[0]._ref).get()

      if (weatherRef._size > 0) {

        return { result: "success", doc: weatherRef._docs()[0]._ref.delete() }
      }
      else {
        return { result: "error", message: "This city does not have weather" }
      }
    } else {
      return { result: "error", message: "City not found" }
    }
  } else {
    return { result: "error", message: "Wrong query type" }
  }


}

router.post("/", async (req, res, next) => {
  const { city, country, type } = req.query
  var changeResult
  try {
    changeResult = await delWeather(city, country, type)
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