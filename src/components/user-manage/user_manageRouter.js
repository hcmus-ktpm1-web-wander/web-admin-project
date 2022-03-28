const express = require("express");
const router = express.Router();
const user_manageController = require("./user_manageController");
const upload = require("../../config/multer.config");
const { body } = require("express-validator");

/*************************** GET methods ***************************/
// render admin
router.get("/admin", user_manageController.renderAdminManage);
// render user
router.get("/user", user_manageController.renderUserManage);

/*************************** POST methods ***************************/
// upload image and insert user
router.post("/add-user", upload.single('avatar_url'),
    body("username").isLength({ min: 6 }).withMessage("Username must be at least 3 characters long"),
    body("username").isLength({ max: 20 }).withMessage("Username must be at most 20 characters long"),
    body("passwd").isLength({ min: 6 }).withMessage("Password must be at least 3 characters long"),
    body("passwd").isLength({ max: 20 }).withMessage("Password must be at most 20 characters long"),
    body('username').custom(value => {
        return require('./user_manageService').checkUsername(value).then(result => {
            if (result) {
                return Promise.reject("Username already exists");
            }
        });
    }),

    body("confirm_passwd").custom((value, { req }) => {
        if (value !== req.body.confirm_passwd) {
            throw new Error("Passwords don't match");
        }
        return true;
    }),

    body('phone').isLength({ min: 10 }).withMessage("Phone number must be at least 10 characters long"),
    body('phone').isMobilePhone('vi-VN').withMessage("Phone number must be a valid phone number")
    , user_manageController.addUser);


/*************************** PUT methods ***************************/
// change user role
router.put("/edit/:userID", user_manageController.editUser);

/*************************** DELETE methods ***************************/
// delete user
router.delete("/edit/:userID", user_manageController.deleteUser);

module.exports = router;