/*************************** GET methods ***************************/
// Render sign-up
exports.renderSignUp = (req, res) => {
    res.render("sign-up/views/sign-up", { layout: './sign-up/views/sign-upLayout', active: { SignUp: true }, page: "Sign-up" });
};

