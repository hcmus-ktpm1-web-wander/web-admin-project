const service = require('./user_manageService');


// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admin_info = await service.getAdminInfo();
    res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", admin_info });
};

// Render admin manage
exports.renderUserManage = async (req, res) => {
    const admin_info = await service.getAdminInfo();
    res.render("user-manage/views/user_manage", { active: { UserManage: true }, page: "User manage", admin_info });
};

