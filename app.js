var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var hbs = require("hbs");
const Sequelize = require("sequelize");
var visitorRouter = require("./routes/visitor");
var usersRouter = require("./routes/users");
var operationRouter = require("./routes/oper");
const session = require("express-session");
const bodyParser = require("body-parser");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: "sddff", saveUninitialized: false, resave: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", visitorRouter);
app.use("/users", usersRouter);
app.use("/operation", operationRouter);
app.use(express.static("public"));

//DB connection
require("./src/connection");

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
hbs.registerHelper("ifEquals", function (arg1, arg2, options) {
  return arg1 == arg2 ? options.fn(this) : options.inverse(this);
});
hbs.registerHelper("ifnoteq", function (a, b, options) {
  if (a != b) {
    return options.fn(this);
  }
  return options.inverse(this);
});
module.exports = app;
// orm sequelize
// multer
// bcrypt
// socket
// mvc design pattern
