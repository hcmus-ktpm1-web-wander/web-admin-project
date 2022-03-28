const service = require("./profileService");
const url = require("url");

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
        const profile = await service.getProfile('6242061e0ec82a3231048ca4');
        if (!profile) res.redirect('/auth/login');

        if (req.query.error === "wrong-pass") {
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
 *  edit info page
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
module.exports.editInfo = async (req, res) => {
    const isTrueSet = (req.query.edit_info === 'true');
    const profile = await service.getProfile('6242061e0ec82a3231048ca4');

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
        await service.editDetailInfo(req.body, '6242061e0ec82a3231048ca4');

        res.redirect("/profile");
    }catch (err) {
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
    const find_account = await service.getProfile('6242061e0ec82a3231048ca4');

    if (req.body.old_passwd !== find_account.password) {
        await res.redirect(url.format({
            pathname: "/profile",
            query: {
                "error": "wrong-pass",
            }
        }));
    }
    else{
        await service.changePassword(req.body.new_passwd, '6242061e0ec82a3231048ca4');
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
        await service.changeAvatar(req.file,'6242061e0ec82a3231048ca4');
        res.redirect('/profile');
    } catch (e) {
        res.render("error", {error: e});
    }
};

