const express = require("express");
const router = express.Router();
const dashboardController = require("./dashboardController");

/*************************** GET methods ***************************/
//render dashboard
router.get("/", dashboardController.renderDashboard);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;