const service = require("./profileService");

/*************************** GET methods ***************************/
// Render profile
module.exports.renderProfile = async (req, res) => {
    const profile = await service.getProfile(req, res);
    console.log("query: ", req.query);
    if (req.query.error === "wrong-pass") {
        res.render("profile/views/profile", { active: { Profile: true, error: true }, page: "Profile", profile });
    } else if (req.query.change_pass === "success") {
        res.render("profile/views/profile", { active: { Profile: true, success: true }, page: "Profile", profile });
    } else {
        res.render("profile/views/profile", { active: { Profile: true }, page: "Profile", profile });
    }
};

module.exports.editDetailInfo = async (req, res) => {
    console.log('---- edit detail info ---');
    let profile = await service.getProfile(req, res);
    const edit = await service.editDetailInfo(req, res, profile);
    await service.getProfile(req, res);

    //redirect
    res.redirect("/profile");
};

module.exports.editInfo = async (req, res) => {
    console.log("--- edit info ---");
    const isTrueSet = (req.query.edit_info === 'true');
    const profile = await service.getProfile(req, res);

    res.render("profile/views/profile", { active: { Profile: true, editInfo: isTrueSet }, page: "Profile", profile });
};

module.exports.changePassword = async (req, res) => {
    await service.changePassword(req, res);
};

module.exports.changeAvatar = async (req, res) => {
    try {
        await service.changeAvatar(req, res, req.file);

        res.redirect('/profile');
    }
    catch (e) {
        res.render("error", { error: e });
    }
};

