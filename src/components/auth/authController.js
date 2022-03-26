const service = require('./authService');


/*************************** GET methods ***************************/
exports.redirectLogin = (req, res) => {
    res.redirect("/login");
}

exports.renderLogin = (req, res) => {
    res.render("auth/views/login", { layout: '/auth/views/login-layout' });
}

// verify login
exports.Verify = (req, res) => {
    service.Verify(req, res);
};



