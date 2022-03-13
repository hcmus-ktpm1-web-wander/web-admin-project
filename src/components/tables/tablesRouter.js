const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const tablesController = require("./tablesController");

/*************************** GET methods ***************************/
//render tables
router.get("/", tablesController.renderTables);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;