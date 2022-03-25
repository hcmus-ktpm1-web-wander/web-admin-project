
/*************************** GET methods ***************************/
exports.redirectLogin = (req, res) => {
    res.redirect("/login");
}

exports.renderLogin = (req, res) => {
    res.render("auth/views/login", { layout: '/auth/views/login-layout', validate: { isTrue: true } });
}

// Render sign-in fail
exports.renderSignInFail = (req, res) => {
    res.render("auth/views/login", { layout: '/auth/views/login-layout', validate: { isTrue: true } });
};

// verify login
exports.Verify = (req, res) => {


    // just redirect
    res.redirect("/dashboard");
};



