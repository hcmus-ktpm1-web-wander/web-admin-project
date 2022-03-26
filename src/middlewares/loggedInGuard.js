const authModel = require('/auth/authModel');

module.exports.loggedInGuard = (req, res, next) => {
    const usr_cookie = req.cookies.user;

};