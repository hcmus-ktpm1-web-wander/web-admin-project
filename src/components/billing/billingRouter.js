const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const billingController = require("./billingController");

/*************************** GET methods ***************************/
//render billing
router.get("/", billingController.renderBilling);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;