const router = require('express').Router();
const userApiController = require('./authApiController')

router.get('/admin', userApiController.getInfOfAdmin);
router.get('/user', userApiController.getInfOfUser);

module.exports = router;