const express = require("express");
const router = express.Router();
const user_manageController = require("./user_manageController");

/*************************** GET methods ***************************/
//render admin
router.get("/admin", user_manageController.renderAdminManage);

//render user
router.get("/user", user_manageController.renderUserManage);

/*************************** POST methods ***************************/
router.post("/edit/:userID", user_manageController.editUser);
router.post("/add-user", user_manageController.addUser);
/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;