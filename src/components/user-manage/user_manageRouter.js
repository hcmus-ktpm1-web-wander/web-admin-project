const express = require("express");
const router = express.Router();
const authController = require("./user_manageController");

/*************************** GET methods ***************************/
//rendirect auth '/' to '/auth/sign-in'
router.get("/", authController.redirectAuth_SignIn);


const admin_manageController = require("./adminController");

/*************************** GET methods ***************************/
//render signIn
router.get("/", admin_manageController.renderAdminManage);
/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;