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

// edit user
exports.editUser = async (req, res) => {
    const id = await req.params.userID;
    const body = await req.body;
    console.log(req.body);

    if (body.delete === "delete") {
        service.deleteUser(id);
    } else {
        service.changeRole(id, body);
    }

    // reload page
    res.redirect('back');

};

