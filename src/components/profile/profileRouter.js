const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const profileController = require("./profileController");

/*************************** GET methods ***************************/
//render profile
router.get("/", profileController.renderProfile);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;