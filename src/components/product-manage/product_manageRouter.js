const express = require("express");
const router = express.Router();
const product_manageController = require("./product_manageController");
const upload = require("../../config/multer.config");
const { body } = require("express-validator");

/*************************** GET methods ***************************/
// render product
router.get("/", product_manageController.renderProductManage);


/*************************** POST methods ***************************/
// upload image and insert user



/*************************** PUT methods ***************************/
// change user role
router.put("/edit/:userID", product_manageController.renderProductManage);

/*************************** DELETE methods ***************************/
// delete user
router.delete("/edit/:userID", product_manageController.renderProductManage);

module.exports = router;