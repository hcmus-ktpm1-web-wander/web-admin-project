const express = require("express");
const router = express.Router();
const orderController = require("./orderController");

/*************************** GET methods ***************************/
//render order
router.get("/", orderController.renderOrder);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;