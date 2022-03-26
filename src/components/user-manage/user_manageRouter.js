const express = require("express");
const router = express.Router();
const user_manageController = require("./user_manageController");

/*************************** GET methods ***************************/
//render admin
router.get("/admin", user_manageController.renderAdminManage);

//render user
router.get("/user", user_manageController.renderUserManage);

/*************************** put methods ***************************/
router.put("/edit/:userID", user_manageController.editUser);

/*************************** DELETE methods ***************************/

module.exports = router;