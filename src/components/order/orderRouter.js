const express = require("express");
const router = express.Router();
const orderController = require("./orderController");

/*************************** GET methods ***************************/
//render order
router.get("/", orderController.renderOrder);


/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/
// change order status
router.put("/:id", orderController.changeStatus);

/*************************** DELETE methods ***************************/

module.exports = router;