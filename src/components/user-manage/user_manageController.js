const service = require('./user_manageService');

// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admins = await service.getAdminInfo();

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    if(endIndex < admins.length) {
        result.next = page + 1;
    }
    else {
        result.disableNext = 'pointer-events: none;';
        result.hiddenNext = 'hidden';
        result.numberNext = 'display: none;';
    }

    if(startIndex > 0) {
        result.prev = page - 1;
    }
    else {
        result.disablePrev = 'pointer-events: none;';
        result.hiddenPrev = 'hidden';
        result.numberPrev = 'display: none;';
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
    const id = req.params.userID;
    const body = req.body;
    console.log(id,body);

    if (body.delete === "delete") {
        await service.deleteUser(id);
    } else {
        await service.changeRole(id, body);
    }
    // reload page
    res.redirect('back');
};

