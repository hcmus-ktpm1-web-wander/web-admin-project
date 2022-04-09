const userService = require('../../../components/user/userService');
const pagination = require("../../../public/js/paging");

/**
 *  get all information of admin
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getInfOfAdmin = async (req, res) => {
    try {
        const admin = await userService.getInfo('Admin');
        const page =  parseInt(req.query.page || 1);
        const result = pagination.paging(admin,page,5);
        res.send(result);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

/**
 *  get all information of user
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getInfOfUser = async (req, res) => {
    try {
        const user = await userService.getInfo('User');
        const page =  parseInt(req.query.page || 1);
        const result = pagination.paging(user,page,5);
        res.send(result);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};