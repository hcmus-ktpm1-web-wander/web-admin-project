const express = require("express");
const router = express.Router();
const authController = require("./user_manageController");

/*************************** GET methods ***************************/
//rendirect auth '/' to '/auth/sign-in'
router.get("/", authController.redirectAuth_SignIn);



/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;