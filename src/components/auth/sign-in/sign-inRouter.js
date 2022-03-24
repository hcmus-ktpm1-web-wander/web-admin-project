const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const signInController = require("./sign-inController");

/*************************** GET methods ***************************/
//render signIn
router.get("/", signInController.renderSignIn);

/*************************** POST methods ***************************/
router.post("/", signInController.Verify)
/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;