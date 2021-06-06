# ReadMe for my Test Weather App
The website can be accessed at https://andre-adidas-frontend.herokuapp.com/

adidas-client is the frontend react app that can be run with the following
npm install
npm run start
localhost:3000

api is the backend with all the API info in Nodejs/Express
npm install
npm run start
localhost:5000

# For backend access to the API you can do one of several requests

# Get all the cities available:
GET Request  https://andre-adidas.herokuapp.com/api/getCities


# Get weather for a city or all cities
GET Request https://andre-adidas.herokuapp.com/api/getWeather
query: 
      city: string,
      country: string,
      type: "all","single"

Type all will return all the weather information for all cities
Type single will return the weather information for the selected city

# Add or delete a city
POST Request https://andre-adidas.herokuapp.com/api/cityManage
query: 
      city: string,
      country: string,
      usage: "new","delete"

Usage "new" will add a new city to the database
Usage "delete" will remove the selected city from the database


# Add or modify Weather from a city
POST Request https://andre-adidas.herokuapp.com/api/addWeather
query: 
      city: string,
      country: string
body:
    array:[
          object:{
                date: new Date()
                hourly: array:[
                              hour: new Date()
                              icon: icon from a List of weather types
                              precipProb: number
                              temp: number,
                              wind: number
                ],
                icon: icon from a List of weather types,
                maxTemp: number,
                minTemp: number,
                precipProb: number
          }
    ]

# Delete weather from a city or from all cities
POST Request https://andre-adidas.herokuapp.com/api/deleteWeather
query: 
      city: string,
      country: string,
      type: "all","single"

Type all will delete all the weather information for all cities
Type single will delete the weather information for the selected city

# Future improvements
Create a CMS backoffice to make it easier to do all the API calls
Create a security system to prevent unwanted users from using the API (Maybe with salt)
Create a better UI with improved functionality
Automatically refresh all the data with data from an external API like openweatherAPI
