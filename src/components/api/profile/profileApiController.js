const profileService = require('../../../components/profile/profileService');

/**
 *  get profile
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getInfo = async (req, res) => {
    try {
        const user = await profileService.getInfoByID(req.user._id);
        res.send(user);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};

/**
 *  edit info of user
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.editInfo = async (req, res) => {
    try {
        await profileService.editDetailInfo(req.user._id, req.body);
        res.status(200);
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};
