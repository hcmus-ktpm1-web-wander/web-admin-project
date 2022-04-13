const router = require('express').Router();
const userApiController = require('./authApiController')
const promotionApiController = require('../promotion/promotionApiController')

router.get('/admin', userApiController.getInfOfAdmin);
router.get('/user', userApiController.getInfOfUser);
router.get('/promotion', promotionApiController.getInfoPromotion);

module.exports = router;