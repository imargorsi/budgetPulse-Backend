require('dotenv').config();

var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const { attachResponseHelpers } = require("./helper/responseHandler");

 
  
var investmentsRouter = require("./routes/investments");
var currentValueRouter = require("./routes/CurrentValue");
var fundsRouter = require("./routes/funds");
var userRouter = require("./routes/user");


var app = express();



app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(attachResponseHelpers);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
 
app.use("/", investmentsRouter);
app.use("/", currentValueRouter);
app.use("/", fundsRouter);
app.use("/", userRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const status = err.isJoi ? 400 : err.status || 500;

  res.status(status).json({
    isSuccess: false,
    isError: true,
    response: null,
    error: {
      message: err.message,
      status,
      details: err.isJoi
        ? err.details.map((detail) => detail.message)
        : undefined,
    },
  });
});

module.exports = app;
