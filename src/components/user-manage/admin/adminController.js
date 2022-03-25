const service = require('./adminService')


/*************************** GET methods ***************************/

// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admin_info = await service.getAdminInfo();

    console.log(admin_info);


    res.render("user-manage/admin/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", admin_info: admin_info });
}


