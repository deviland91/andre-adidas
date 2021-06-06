var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const admin = require('firebase-admin');
const serviceAccount = require('./adidas-feaf4-firebase-adminsdk-mfsji-f836b2b944.json');

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
} else {
  admin.app(); // if already initialized, use that one
}

var indexRouter = require('./routes/index');

var getCitiesAPI = require("./routes/getCities")
var cityManageAPI = require("./routes/cityManage")
var getWeatherAPI = require("./routes/getWeather")
var addWeatherAPI = require("./routes/addWeather")
var deleteWeatherAPI = require("./routes/deleteWeather")

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use("/api/getCities", getCitiesAPI)
app.use("/api/cityManage", cityManageAPI)
app.use("/api/getWeather", getWeatherAPI)
app.use("/api/addWeather", addWeatherAPI)
app.use("/api/deleteWeather", deleteWeatherAPI)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
