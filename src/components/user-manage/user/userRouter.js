const express = require("express");
const router = express.Router();
const user_manageController = require("./userController");

/*************************** GET methods ***************************/
//render signIn
router.get("/", user_manageController.renderUserManage);

/*************************** POST methods ***************************/
/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;