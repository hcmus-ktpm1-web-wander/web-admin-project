const express = require("express");
const router = express.Router();
const user_manageController = require("./user_manageController");
const upload = require("../../config/multer.config");

/*************************** GET methods ***************************/
//render admin
router.get("/admin", user_manageController.renderAdminManage);

//render user
router.get("/user", user_manageController.renderUserManage);

/*************************** POST methods ***************************/
router.post("/add-user",upload.single('avatar_url'), user_manageController.addUser);

/*************************** PUT methods ***************************/
router.put("/edit/:userID", user_manageController.editUser);

/*************************** DELETE methods ***************************/
router.delete("/edit/:userID", user_manageController.deleteUser);

module.exports = router;