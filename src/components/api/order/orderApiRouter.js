const router = require('express').Router();
const orderApiController = require('./orderApiController');

router.get('/', orderApiController.getOrders);

module.exports = router;