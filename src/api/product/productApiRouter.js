const router = require('express').Router();
const productController = require('./productApiController');

router.get('/', productController.getProducts);
router.post('/', productController.getProducts);

module.exports = router;