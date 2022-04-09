const router = require('express').Router();
const profileApiController = require('./profileApiController')


router.get('/info', profileApiController.getInfo);
router.post('/edit-info', profileApiController.editInfo);

module.exports = router;