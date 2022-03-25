const express = require("express");
const router = express.Router();
const {body} = require('express-validator');
const signInController = require("./sign-inController");
/*************************** GET methods ***************************/
//redirect signIn
router.get("/", signInController.redirectSignIn);
//render signIn
router.get("/sign-in", signInController.renderSignIn);
/*************************** POST methods ***************************/

module.exports = router;