const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require("./config/database.config")


const dashboardRouter = require('./components/dashboard/dashboardRouter')
const billingRouter = require('./components/billing/billingRouter')
const tablesRouter = require('./components/tables/tablesRouter')
const profileRouter = require('./components/profile/profileRouter')
const signInRouter = require('./components/sign-in/sign-inRouter')
// const loggedInGuard = require('./middlewares/LoggedInGuard')

// Connect database
db.connect();

const app = express();

// view engine setup
app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, "components")]);
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Connect database
db.connect();

// Authentication middleware
app.use('/', signInRouter);

// Secure middlewares
//app.all('/*', loggedInGuard);

// Store account
app.use(function (req, res, next) {
  res.locals.admin = req.user;
  next();
})

// Router middlewares
app.use('/dashboard', dashboardRouter);
app.use('/billing', billingRouter);
app.use('/tables', tablesRouter);
app.use('/profile', profileRouter);

<<<<<<< HEAD
=======


>>>>>>> 3e80fc98a04e96fbb4e823bc3dcd16e4306a0a55
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
