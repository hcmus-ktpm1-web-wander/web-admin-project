const service = require('./adminService')


/*************************** GET methods ***************************/

// Render admin manage
exports.renderAdminManage = (req, res) => {
    res.render("user-manage/admin/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage" });
};

