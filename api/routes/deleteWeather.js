const express = require("express")
const router = express.Router()
const admin = require('firebase-admin');

const db = admin.firestore();

const addCity = async (city, country) => {

  const docRef = await db.collection('cities').doc(city + "-" + country).delete();
  console.log("docRef: ", docRef)
}

router.post("/", (req, res, next) => {
  const { city, country } = req.query
  addCity(city, country)
  res.send(JSON.stringify({ zei: "zei" }))
})

module.exports = router