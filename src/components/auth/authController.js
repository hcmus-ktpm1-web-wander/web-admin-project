/*************************** GET methods ***************************/
// redirect to login page
exports.redirectLogin = (req, res) => {
    res.redirect("/login");
}

// render login page
exports.renderLogin = (req, res) => {
    res.render("auth/views/login", { layout: '/auth/views/login-layout' });
}

// render login page
exports.redirectToDashboard = (req, res) => {
    res.redirect("/dashboard");
}



