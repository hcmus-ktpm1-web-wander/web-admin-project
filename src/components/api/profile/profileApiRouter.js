const express = require('express')
const router = express.Router();
const upload = require('../../../config/multer.config');
const profileApiController = require('./profileApiController')


router.get('/info', profileApiController.getInfo);
router.post('/edit-info', profileApiController.editInfo);

module.exports = router;