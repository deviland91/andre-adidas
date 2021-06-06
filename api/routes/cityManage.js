const express = require("express")
const router = express.Router()
const admin = require('firebase-admin');

const db = admin.firestore();

const addCity = async (city, country, usage) => {
  if (!city || city.length === 0) {
    return { result: "error", message: "City cannot be empty" }
  } else if (!country || country.length === 0) {
    return { result: "error", message: "Country cannot be empty" }
  }

  if (usage == "delete") {
    const docRef = await db.collection('cities').where("city", "==", city).where("country", "==", country).get()
    if (docRef._size > 0) {

      return { result: "success", doc: docRef._docs()[0]._ref.delete() }
    }
    else {
      return { result: "error", message: "Document to delete not found" }
    }


  } else if (usage == "new") {
    var docRef = await db.collection('cities').where("city", "==", city).where("country", "==", country).get()
    if (docRef._size > 0) {
      return { result: "error", message: "Document already exists" }
    } else {
      docRef = db.collection('cities').doc();

      await docRef.set({
        city: city,
        country: country
      })
      return { result: "success", doc: docRef }
    }

  } else {
    return { result: "error", message: "Request cannot be completed" }
  }
}

router.post("/", async (req, res, next) => {

  const { city, country, usage } = req.query
  const changeResult = await addCity(city, country, usage)
  if (changeResult.result == "error") {
    res.statusCode = 500;
    res.send(JSON.stringify(changeResult))
  } else {
    res.statusCode = 200;
    res.send(JSON.stringify(changeResult))
  }

})

module.exports = router