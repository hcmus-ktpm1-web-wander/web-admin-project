const service = require('./user_manageService');


// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admins = await service.getAdminInfo();

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    console.log('end index:', endIndex);
    console.log('admins:',admins.length);

    if(endIndex < admins.length) {
        result.next = page + 1;
    }
    else {
        result.disableNext = 'pointer-events: none;';
    }

    if(startIndex > 0) {
        result.prev = page - 1;
    }
    else {
        result.disablePrev = 'pointer-events: none;';
    }
    result.page = page;
    result.admins = admins.slice(startIndex, endIndex);

    res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", result});
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

