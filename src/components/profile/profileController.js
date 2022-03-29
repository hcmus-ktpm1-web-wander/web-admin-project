const service = require("./profileService");
const url = require("url");
const {validationResult} = require("express-validator")
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
        const user_cookie = req.cookies.user;
        const id = user_cookie.split("_")[0];
        const profile = await service.getProfile(id);

        if (!profile) res.redirect('/auth/login');

        if (req.query.invalid === "email-error") {
            res.render("profile/views/profile", {active: {Profile: true, invalid: true}, page: "Profile", profile});
        }else if (req.query.error === "wrong-pass") {
            res.render("profile/views/profile", {active: {Profile: true, error: true}, page: "Profile", profile});
        } else if (req.query.error === "wrong-pass") {
            res.render("profile/views/profile", {active: {Profile: true, error: true}, page: "Profile", profile});
        } else if (req.query.change_pass === "success") {
            res.render("profile/views/profile", {active: {Profile: true, success: true}, page: "Profile", profile});
        } else {
            res.render("profile/views/profile", {active: {Profile: true}, page: "Profile", profile});
        }
    } catch (err) {
        throw err;
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

    const user_cookie = req.cookies.user;
    const id = user_cookie.split("_")[0];
    const isTrueSet = (req.query.edit_info === 'true');
    const profile = await service.getProfile(id);

    res.render("profile/views/profile", {active: {Profile: true, editInfo: isTrueSet}, page: "Profile", profile});
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
        const user_cookie = req.cookies.user;
        const id = user_cookie.split("_")[0];
        await service.editDetailInfo(id, req.body);

        res.redirect("/profile");
    } catch (err) {
        throw err;
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

    const user_cookie = req.cookies.user;
    const id = user_cookie.split("_")[0];
    const find_account = await service.getProfile(id);

    if (req.body.old_passwd !== find_account.password) {
        await res.redirect(url.format({
            pathname: "/profile",
            query: {
                "error": "wrong-pass",
            }
        }));
    } else {
        await service.changePassword(id, req.body.new_passwd);

        await res.redirect(url.format({
            pathname: "/profile",
            query: {
                "change_pass": "success",
            }
        }));
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
        const user_cookie = req.cookies.user;
        const id = user_cookie.split("_")[0];
        await service.changeAvatar(id, req.file);

        res.redirect('/profile');
    } catch (e) {
        res.render("error", {error: e});
    }
};

