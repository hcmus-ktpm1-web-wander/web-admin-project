const express = require('express')
const router = express.Router();

const orderRouter = require("./order/orderApiRouter")
const profileRouter = require("./profile/profileApiRouter")
const userManageRouter = require("./user-manage/userManageApiRouter")

router.use('/order', orderRouter);
router.use('/profile', profileRouter);
// router.use("/user-manage", );

module.exports = router;