const express = require('express')
const router = express.Router();

const orderRouter = require("./order/orderApiRouter")
const profileRouter = require("./profile/profileApiRouter")

router.use('/order', orderRouter);
router.use('/profile', profileRouter);

module.exports = router;