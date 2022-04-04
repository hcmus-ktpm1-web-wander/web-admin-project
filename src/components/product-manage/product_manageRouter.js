const express = require("express");
const router = express.Router();
const product_manageController = require("./product_manageController");
const upload = require("../../config/multer.config");
const { body } = require("express-validator");

/*************************** GET methods ***************************/
// render product
router.get("/", product_manageController.renderProductManage);

// render product detail
router.get("/:productID", product_manageController.renderProductDetail);

// render product edit
router.get("/edit/:productID", product_manageController.renderProductDetailEdit);

/*************************** POST methods ***************************/
// edit product
router.post("/edit/:productID", upload.array('img'), product_manageController.editProduct);

/*************************** PUT methods ***************************/
// add product
router.put("/add-product", upload.array('img'), product_manageController.addProduct);

/*************************** DELETE methods ***************************/
// delete product
router.delete("/edit/:productID", product_manageController.deleteProduct);

module.exports = router;