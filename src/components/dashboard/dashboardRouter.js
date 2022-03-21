const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const dashboardController = require("./dashboardController");

/*************************** GET methods ***************************/
//render dashboard
router.get("/", dashboardController.renderDashboard);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;