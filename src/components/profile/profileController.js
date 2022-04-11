const service = require("./profileService");
const url = require("url");
const { validationResult } = require("express-validator")
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

