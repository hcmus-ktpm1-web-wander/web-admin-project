const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const upload = require("../../config/multer.config");
const profileController = require("./profileController");

/*************************** GET methods ***************************/
//render profile
router.get("/", profileController.renderProfile);

// edit info
router.get("/edit/info", profileController.editInfo);

/*************************** POST methods ***************************/
//edit intro
router.post("/edit/detail-info", profileController.editDetailInfo);

//change password
router.post("/edit/change-password", profileController.changePassword);

//change avatar
router.post("/edit/change-avatar", upload.single('avatar_url'), profileController.changeAvatar);


/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;