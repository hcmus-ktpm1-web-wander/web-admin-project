const service = require('./adminService')


/*************************** GET methods ***************************/
exports.redirectAuth_SignIn = (req, res) => {
    res.redirect("/auth/sign-in");
}






/*************************** GET methods ***************************/

// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admin_info = await service.getAdminInfo();

    console.log(admin_info);


    res.render("user-manage/admin/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", admin_info });
};

