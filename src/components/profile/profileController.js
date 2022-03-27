const service = require("./profileService");

/*************************** GET methods ***************************/
// Render profile
module.exports.renderProfile = async (req, res) => {
    const profile = await service.getProfile(req, res);
    res.render("profile/views/profile", { active: { Profile: true }, page: "Profile", profile });
};

module.exports.editDetailInfo = async (req, res) => {
    console.log('---- edit detail info ---');
    var profile = await service.getProfile(req, res);
    const edit = await service.editDetailInfo(req, res, profile);
    profile = await service.getProfile(req, res);

    //redirect
    res.redirect("/profile");
};

module.exports.editInfo = async (req, res) => {
    console.log("--- edit info ---");
    var isTrueSet = (req.query.edit_info === 'true');
    const profile = await service.getProfile(req, res);

    res.render("profile/views/profile", { active: { Profile: true, editInfo: isTrueSet }, page: "Profile", profile });
};

module.exports.changePassword = async (req, res) => {
    await service.changePassword(req, res);
    res.redirect('back');
};

module.exports.changeAvatar = async (req, res) => {
    try {
        console.log("--- controller change avatar ---");
        // Change avatar

        await service.changeAvatar(req, req.file);
        res.redirect('back');
    }
    catch (e) {
        res.render("error", { error: e });
    }
};

