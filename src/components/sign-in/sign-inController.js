/*************************** GET methods ***************************/
// Render sign-in
exports.renderSignIn = (req, res) => {
    res.render("sign-in/views/sign-in", { active: { SignIn: true }, page: "Sign-in" });
};

