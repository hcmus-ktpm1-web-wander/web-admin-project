const express = require('express');
const router = express.Router();
const orderApiController = require("./orderApiController")

router.get("/", orderApiController.getOrders);

module.exports = router;