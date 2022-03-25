const express = require("express");
const router = express.Router();
const authController = require("./authController");

/*************************** GET methods ***************************/
//redirect auth '/' to '/auth/sign-in'
router.get("/", authController.redirectLogin);

//render login page
router.get("/login", authController.renderLogin);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;