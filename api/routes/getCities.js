const express = require("express")
const axios = require("axios")
const router = express.Router()
const admin = require('firebase-admin')

const db = admin.firestore();



const getCity = async () => {

  const cityRef = db.collection('cities')
  const docs = await cityRef.get()

  if (docs._size > 0) {


    // docs.forEach(doc => {

    //   docArray.push({
    //     id: doc.id,
    //     city: doc.data().city,
    //     country: doc.data().country
    //   })
    // })
    var docArray = docs._docs().map(doc => {
      const data = doc.data()
      return { id: data.id, city: data.city, country: data.country }
    })
    return { result: "success", cities: docArray }
  } else {
    return { result: "error", message: 'No such document!' }
  }

}


router.get("/", async (req, res, next) => {
  const getCities = await getCity()
  if (getCities.result == "error") {
    res.statusCode = 500;
    res.send(JSON.stringify(getCities))
  } else {
    res.statusCode = 200;
    res.send(JSON.stringify(getCities))
  }
})

module.exports = router