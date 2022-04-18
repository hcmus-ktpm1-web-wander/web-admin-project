const router = require('express').Router();
const userApiController = require('./authApiController')
const promotionApiController = require('../promotion/promotionApiController')

router.get('/admin', userApiController.getInfOfAdminByFilter);
router.get('/user', userApiController.getInfOfUserByFilter);
router.get('/promotion', promotionApiController.getInfoPromotion);

module.exports = router;