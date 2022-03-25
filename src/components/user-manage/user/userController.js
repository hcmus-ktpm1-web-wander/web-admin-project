const service = require('./userService')


/*************************** GET methods ***************************/

// Render user manage
exports.renderUserManage = (req, res) => {
    res.render("user-manage/user/views/user_manage", { active: { UserManage: true }, page: "User manage" });
};

