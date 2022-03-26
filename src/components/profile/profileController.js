const service = require("./profileService");

/*************************** GET methods ***************************/
// Render profile
module.exports.renderProfile = async (req, res) => {
    const profile = await service.getProfile(req, res);
    res.render("profile/views/profile", { active: { Profile: true }, page: "Profile", profile });
};

module.exports.editIntro = async (req, res) => {
    const edit = await service.editIntro(req, res);
    res.redirect('back');
};

module.exports.changePassword = async (req, res) => {
    await service.changePassword(req, res);
    res.redirect('back');
};

module.exports.changeAvatar = async (req, res) => {
    await service.changeAvatar(req, res);
    res.redirect('back');
};

