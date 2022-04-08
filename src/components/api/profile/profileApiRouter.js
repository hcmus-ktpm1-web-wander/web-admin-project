const express = require('express')
const router = express.Router();
const upload = require('../../../config/multer.config');
const profileApiController = require('./profileApiController')


router.use('/info', profileApiController.getInfo);
router.use('/edit-info', profileApiController.editInfo);
router.use('/change-avatar', upload.single('avatar_url'), profileApiController.changeAvatar);

module.exports = router;