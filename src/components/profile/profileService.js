const userModel = require('../user-manage/user_manageModel');
const cloudinary = require('../../config/cloudinary.config');
const url = require('url');

/**
 *  get user profile
 *
 * @param id {string}
 * @returns {Promise<*>}
 */
module.exports.getProfile = async (id) => {

    try {
        return userModel.findById(id);
    } catch (err) {
        throw err;
    }

}

/**
 *  edit profile page
 *
 * @param body {object}
 * @param id {string}
 * @returns {Promise<void>}
 */
module.exports.editDetailInfo = async (id, body) => {
    try {
        await userModel.findByIdAndUpdate(id,
            {
                $set: {
                    intro: body.intro,
                    fullname: body.edit_fullname,
                    username: body.edit_username,
                    phone: body.edit_phone,
                    email: body.edit_email,
                    address: body.edit_addr
                }
            });
    } catch (err) {
        throw err;
    }
};

/**
 *  change password of user
 *
 * @param newPass {string}
 * @param id {string}
 * @returns {Promise<void>}
 */
module.exports.changePassword = async (id, newPass) => {
    try {
        await userModel.findOneAndUpdate(
            { account_id: id },
            { $set: { password: newPass } });
    } catch (err) {
        throw err;
    }

};

/**
 *  change avatar of user
 *
 * @param file {object}
 * @param id {string}
 * @returns {Promise<void>}
 */
module.exports.changeAvatar = async (id, file) => {
    try {
        // upload image
        let result;
        if (file) {
            result = await cloudinary.v2.uploader.upload(file.path, {
                folder: "admin_avatar",
                use_filename: true,
            });
        }

        // get image url
        let { url } = result ?? "";
        if (url === undefined) {
            const profile = this.getProfile(id);
            // default avatar
            url = profile.avatar_url;
        }

        //const id = req.cookies.user.split("_")[0];

        await userModel.findByIdAndUpdate(id, { avatar_url: url });
    } catch (err) {
        throw err;
    }
};
