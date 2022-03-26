const service = require('./user_manageService');


// Render admin manage
exports.renderAdminManage = async (req, res) => {
    const admins = await service.getInfo('Admin');

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    console.log('end index:', endIndex);
    console.log('admins:', admins.length);

    if (endIndex < admins.length) {
        result.next = page + 1;
    }
    else {
        result.disableNext = 'pointer-events: none;';
    }

    if (startIndex > 0) {
        result.prev = page - 1;
    }
    else {
        result.disablePrev = 'pointer-events: none;';
    }
    result.page = page;
    result.admins = admins.slice(startIndex, endIndex);

    res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", result });
};

// Render admin manage
exports.renderUserManage = async (req, res) => {
    const users = await service.getInfo("User");

    const page = parseInt(req.query.page) || 1;
    const limit = 5;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const result = {};

    console.log('end index:', endIndex);
    console.log('users:', users.length);

    if (endIndex < users.length) {
        result.next = page + 1;
    }
    else {
        result.disableNext = 'pointer-events: none;';
    }

    if (startIndex > 0) {
        result.prev = page - 1;
    }
    else {
        result.disablePrev = 'pointer-events: none;';
    }
    result.page = page;
    result.admins = users.slice(startIndex, endIndex);

    res.render("user-manage/views/user_manage", { active: { UserManage: true }, page: "User manage", result });
};

// edit user
exports.editUser = async (req, res) => {
    const id = await req.params.userID;
    const body = await req.body;

    if (body.delete === "delete") {
        service.deleteUser(id);
    } else {
        service.changeRole(id, body);
    }

    // reload page
    res.redirect('back');

};

// add User
exports.addUser = async (req, res) => {
    console.log('------------');
    console.log((req.params));
    console.log('------------');
    console.log(req.body);
    console.log('------------');

    const body = await req.body;

    service.addUser(req.body);

    // reload page
    res.redirect('back');

};

