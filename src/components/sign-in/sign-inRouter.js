const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const signInController = require("./sign-inController");

/*************************** GET methods ***************************/
//redirect signIn
router.get("/", signInController.redirectSignIn);
//render signIn
router.get("/sign-in", signInController.renderSignIn);

/*************************** POST methods ***************************/
router.post("/sign-in", signInController.Verify)
/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;