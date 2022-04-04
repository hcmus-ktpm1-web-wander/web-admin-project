const express = require("express");
const router = express.Router();
const upload = require("../../config/multer.config");
const profileController = require("./profileController");
const adminService = require("../user-manage/user_manageService");
const {body}= require("express-validator");
/*************************** GET methods ***************************/
//render profile
router.get("/", profileController.renderProfile);

// render info page
router.get("/edit/info", profileController.editInfo);

/*************************** POST methods ***************************/
//edit intro
router.post("/edit/detail-info",
    body("edit_email").isEmail().withMessage("Invalid email"),
    profileController.editDetailInfo);

//change password
router.post("/edit/change-password",
    body("new_passwd").isLength({ min: 5 }).withMessage("Password must be at least 5 characters long"),
    body("new_passwd").isLength({ max: 20 }).withMessage("Password must be less than 20 characters long"),
    profileController.changePassword);

//change avatar
router.post("/edit/change-avatar", upload.single('avatar_url'), profileController.changeAvatar);


/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;