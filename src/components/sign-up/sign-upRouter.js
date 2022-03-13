const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const signUpController = require("./sign-upController");

/*************************** GET methods ***************************/
//render signUp
router.get("/", signUpController.renderSignUp);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;