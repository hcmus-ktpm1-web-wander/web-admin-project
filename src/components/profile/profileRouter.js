const express = require("express");
const { redirect } = require("express/lib/response");
const router = express.Router();
const profileController = require("./profileController");

/*************************** GET methods ***************************/
//render profile
router.get("/", profileController.renderProfile);


/*************************** POST methods ***************************/
//edit intro
router.post("/edit/intro", profileController.editIntro);

//change password
router.post("/edit/change-password", profileController.changePassword);

//change avatar
router.post("/edit/change-avatar", profileController.changeAvatar);

/*************************** PUT methods ***************************/

/*************************** DELETE methods ***************************/

module.exports = router;