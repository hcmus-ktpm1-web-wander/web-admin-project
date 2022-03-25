const express = require("express");
const router = express.Router();
const admin_manageController = require("./adminController");

/*************************** GET methods ***************************/
//render signIn
router.get("/", admin_manageController.renderAdminManage);

/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;