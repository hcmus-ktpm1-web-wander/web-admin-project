const router = require('express').Router();
const promotionApiController = require('./promotionApiController')


router.get('/load', promotionApiController.getInfoPromotion);


module.exports = router;