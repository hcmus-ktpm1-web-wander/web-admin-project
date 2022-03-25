const express = require("express");
const router = express.Router();
const admin_manageController = require("./user_manageController");

/*************************** GET methods ***************************/
//render admin
router.get("/admin", admin_manageController.renderAdminManage);

//render user
router.get("/user", admin_manageController.renderUserManage);
/*************************** POST methods ***************************/

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;