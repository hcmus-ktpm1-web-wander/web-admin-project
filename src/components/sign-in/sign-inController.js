/*************************** GET methods ***************************/
exports.redirectSignIn = (req, res) => {
    res.redirect("/sign-in");
}

// Render sign-in
exports.renderSignIn = (req, res) => {
    res.render("sign-in/views/sign-in", { layout: './sign-in/views/sign_in_layout' });
};

