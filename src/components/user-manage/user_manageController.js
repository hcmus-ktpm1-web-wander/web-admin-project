const service = require('./user_manageService');
const utils = require('./user_manageUtils');

/************************************* GET methods *************************************/
/**
 *  get admin information list and pagination data
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderAdminManage = async (req, res) => {
    try{
        const admins = await service.getInfo('Admin');
        const page = parseInt(req.query.page) || 1;
        const result = utils.paging(admins, page);
        res.render("user-manage/views/admin_manage", { active: { AdminManage: true }, page: "Admin manage", result });

    }catch (e) {
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
        res.render("user-manage/views/user_manage", {active: {UserManage: true}, page: "User manage", result});
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
    try{
        await service.addUser(req.body,req.file);
        res.redirect('back');
    }
    catch (e) {
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
    try{
        await service.changeRole(req.params.userID, req.body);
        res.redirect('back');
    }
    catch (e) {
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
    try{
        await service.deleteUser(req.params.userID);
        res.redirect('back');
    }
    catch (e) {
        res.render("error", { error: e });
    }
};


