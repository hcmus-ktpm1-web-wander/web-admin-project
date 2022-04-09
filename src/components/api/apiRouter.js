const router = require('express').Router();

const profileRouter = require("./profile/profileApiRouter");
const productRouter = require("./product/productApiRouter");
const orderRouter = require("./order/orderApiRouter");
const authRouter = require("./auth/authApiRouter");

router.use('/profile', profileRouter);
router.use('/product', productRouter);
router.use('/order', orderRouter);
router.use('/auth', authRouter);

module.exports = router;