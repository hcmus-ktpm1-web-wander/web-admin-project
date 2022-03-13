/*************************** GET methods ***************************/
// Render profile
exports.renderProfile = (req, res) => {
    res.render("profile/views/profile", { active: { Profile: true }, page: "Profile" });
};

