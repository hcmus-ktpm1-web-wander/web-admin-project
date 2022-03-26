const service = require('./user_manageService');
const utils = require('./user_managerutils');
// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admins = await service.getInfo('Admin');
    const page = parseInt(req.query.page) || 1;
    const result = utils.paging(admins,page);

    res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", result });
};

// Render admin manage
exports.renderUserManage = async (req, res) => {
    const users = await service.getInfo("User");
    const page = parseInt(req.query.page) || 1;
    const result = utils.paging(users,page);


    res.render("user-manage/views/user_manage", { active: { UserManage: true }, page: "User manage", result });
};

// edit user
exports.editUser = async (req, res) => {
    const id = await req.params.userID;
    const body = await req.body;

    if (body.delete === "delete") {
        await service.deleteUser(id);
    } else {
        await service.changeRole(id, body);
    }
    // reload page
    res.redirect('back');
};

