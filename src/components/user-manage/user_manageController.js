const service = require('./user_manageService');
const utils = require('./user_manageUtils');
const { validationResult } = require('express-validator');

/************************************* GET methods *************************************/
/**
 *  get admin information list and pagination data
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderAdminManage = async (req, res) => {
    try {
        const admins = await service.getInfo('Admin');
        const page = parseInt(req.query.page) || 1;
        const result = utils.paging(admins, page);
        if (req.session.errors !== undefined) {
            const errors = req.session.errors;
            req.session.errors = undefined;
            res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", result, errors, checkErrors: true });
        }
        else {
            req.session.errors = undefined
            res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", result });
        }
    } catch (e) {
        res.render("error", { error: e });
    }
};

/**
 *  get user information list and pagination data
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderUserManage = async (req, res) => {
    try {
        const users = await service.getInfo('User');
        const page = parseInt(req.query.page) || 1;
        const result = utils.paging(users, page);
        res.render("user-manage/views/user_manage", { active: { UserManage: true }, page: "User manage", result });
    } catch (e) {
        res.render("error", { error: e });
    }
};

/************************************* POST methods *************************************/
/**
 *  add user
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.addUser = async (req, res) => {
    try {
        console.log('-----------');
        console.log("req body:", req.body);
        console.log("req sesion:", req.session);
        // validate request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            var e = {};
            for (let i = 0; i < errors.array().length; i++) {
                if (errors.array()[i].param === "passwd") {
                    e.password = errors.array()[i].msg;
                }
                else if (errors.array()[i].param === "phone") {
                    e.phone = errors.array()[i].msg;
                }
                else if (errors.array()[i].param === "username") {
                    e.username = errors.array()[i].msg;
                }
                else if (errors.array()[i].param === "confirm_passwd") {
                    e.confirm_password = errors.array()[i].msg;
                }
            }
            req.session.errors = e;
            res.redirect('back');
        }
        else {
            // insert data to database
            await service.addUser(req.body, req.file);
            res.redirect('back');
        }
    } catch (e) {
        res.render("error", { error: e });
    }
};

/************************************* PUT methods *************************************/
/**
 *  edit role of user
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.editUser = async (req, res) => {
    try {
        await service.changeRole(req.params.userID, req.body);
        res.redirect('back');
    } catch (e) {
        res.render("error", { error: e });
    }
};

/************************************* DELETE methods *************************************/
/**
 *  delete user
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.deleteUser = async (req, res) => {
    try {
        await service.deleteUser(req.params.userID);
        res.redirect('back');
    } catch (e) {
        res.render("error", { error: e });
    }
};


