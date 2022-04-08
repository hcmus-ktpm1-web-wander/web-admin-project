const service = require("./profileService");
const url = require("url");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator")
const adminService = require("../user-manage/user_manageService");
/******************************** GET methods ********************************/
/**
 *  render profile page checking if user changed his password, avatar
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
module.exports.renderProfile = async (req, res) => {
    try {
        const profile = req.user;

        if (!profile) res.redirect('/auth/login');

        if (req.query.invalid === "email-error") {
            res.render("profile/views/profile", { active: { Profile: true, invalid: true }, page: "Profile", profile });
        } else if (req.query.error === "wrong-pass") {
            res.render("profile/views/profile", { active: { Profile: true, error: true }, page: "Profile", profile });
        } else if (req.query.error === "wrong-pass") {
            res.render("profile/views/profile", { active: { Profile: true, error: true }, page: "Profile", profile });
        } else if (req.query.change_pass === "success") {
            res.render("profile/views/profile", { active: { Profile: true, success: true }, page: "Profile", profile });
        } else {
            res.render("profile/views/profile", { active: { Profile: true }, page: "Profile", profile });
        }

        res.render("profile/views/profile", { active: { Profile: true }, page: "Profile" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 *  render info page
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
module.exports.editInfo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await res.redirect(url.format({
                pathname: "/profile",
                query: {
                    "invalid": "email-error"
                }
            }));
            return;
        }

        const isTrueSet = (req.query.edit_info === 'true');
        const profile = req.user;

        res.render("profile/views/profile", { active: { Profile: true, editInfo: isTrueSet }, page: "Profile", profile });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

};

/******************************** POST methods ********************************/

/**
 *  edit profile page
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
module.exports.editDetailInfo = async (req, res) => {
    try {
        await service.editDetailInfo(req.user._id, req.body);
        res.redirect("/profile");
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 *  change password page
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
module.exports.changePassword = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            await res.redirect(url.format({
                pathname: "/profile",
                query: {
                    "warning": "password-error"
                }
            }));
            return;
        }

        const user = await adminService.checkUsername(req.user.username);
        if (!(await bcrypt.compare(req.body.old_passwd, user.password))) {
            await res.redirect(url.format({
                pathname: "/profile",
                query: {
                    "error": "wrong-pass",
                }
            }));
        } else {
            await service.changePassword(req.user._id, req.body.new_passwd);

            await res.redirect(url.format({
                pathname: "/profile",
                query: {
                    "change_pass": "success",
                }
            }));
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

/**
 *  change avatar page
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
module.exports.changeAvatar = async (req, res) => {
    try {
        await service.changeAvatar(req.user._id, req.file);
        res.redirect('/profile');
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

