const router = require('express').Router();

const dashboardRouter = require('./dashboard/dashboardApiRouter');
const authRouter = require("./auth/authApiRouter");
const orderRouter = require("./order/orderApiRouter");
const productRouter = require("./product/productApiRouter");
const profileRouter = require("./profile/profileApiRouter");
const promotionRouter = require("./promotion/promotionApiRouter");

router.use('/dashboard', dashboardRouter);
router.use('/auth', authRouter);
router.use('/order', orderRouter);
router.use('/product', productRouter);
router.use('/profile', profileRouter);
router.use('/promotion', promotionRouter);

module.exports = router;