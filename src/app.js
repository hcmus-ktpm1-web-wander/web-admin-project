const createError = require('http-errors');
const express = require('express');

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const db = require("./config/database.config")
const methodOverride = require('method-override');
const session = require("express-session");
const flash = require("connect-flash");

const dashboardRouter = require('./components/dashboard/dashboardRouter')
const orderRouter = require('./components/order/orderRouter')
const tablesRouter = require('./components/tables/tablesRouter')
const profileRouter = require('./components/profile/profileRouter')
const authRouter = require('./components/auth/authRouter')
const productRouter = require('./components/product-manage/product_manageRouter')
const user_manageRouter = require("./components/user-manage/user_manageRouter");

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
app.use(cookieParser("ecommerce-web-app"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(session({
  secret: "ecommerce-web-app",
  resave: true,
  saveUninitialized: true
}));

app.use(flash());

// Authentication middleware
app.use('/', authRouter);

// Secure middlewares
//app.all('/*', loggedInGuard);

// Store account
app.use(function (req, res, next) {
  res.locals.admin = req.user;
  next();
})

// Router middlewares
app.use('/dashboard', dashboardRouter);
app.use('/order', orderRouter);
app.use('/tables', tablesRouter);
app.use('/profile', profileRouter);
app.use('/manage', user_manageRouter);
app.use('/product', productRouter);

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
