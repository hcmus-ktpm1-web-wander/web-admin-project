// render login page
exports.renderLogin = (req, res) => {
    req.logout();
    const invalidAccount = (req.query['invalid-account'] !== undefined)||false;
    res.render("auth/views/login", { layout: '/auth/views/login-layout', invalidAccount });
}

// log out user
exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
}



