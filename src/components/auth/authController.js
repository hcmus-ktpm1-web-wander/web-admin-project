const service = require('./authService');


/*************************** GET methods ***************************/
// redirect to login page
exports.redirectLogin = (req, res) => {
    res.redirect("/login");
}

// render login page
exports.renderLogin = (req, res) => {
    res.render("auth/views/login", { layout: '/auth/views/login-layout' });
}

// verify login
exports.Verify = (req, res) => {
    service.Verify(req, res);
};



