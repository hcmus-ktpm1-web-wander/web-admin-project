const model = require('./models/adminModel');
const cloudinary = require('../../config/cloudinary.config');

/**
 * Get all admin or user
 * @param role {string:{Admin, User}}
 * @returns {Promise<[Admin-User: model]>}
 */
module.exports.getInfo = async (role) => {
    try {
        return await model.find({ role }).lean();
    } catch (err) {
        throw err;
    }
}

/**
 * delete admin or user
 * @param id {string: String}
 * @returns {Promise<void>}
 */
module.exports.deleteUser = async (id) => {
    try {
        await model.find({ _id: id }).remove();
    } catch (err) {
        throw err;
    }
}

/**
 * change role of admin or user
 * @param id {string: String}
 * @param body {string: String}
 * @returns {Promise<void>}
 */
module.exports.changeRole = async (id, body) => {
    try {
        await model.findByIdAndUpdate({ _id: id }, { $set: { role: body.to_role } });
    } catch (err) {
        throw err;
    }
}

module.exports.addUser = async (body, file) => {
    try {

        // const objectID = await new mongoose.Types.ObjectId();

        // upload image
        let result;
        if (file) {
            result = await cloudinary.v2.uploader.upload(file.path, {
                folder: "admin_avatar",
                use_filename: true,
            });
        }
        const { url } = result ?? "";

        //admin.avatar_url = url;

        body['fullname'] = body.fname + ' ' + body.lname;
        body['email'] = body.mail_username + body.mail_domain;
        body['employed'] = new Date();
        body['avatar_url'] = url;


        delete body.fname;
        delete body.lname;
        delete body.passwd;
        delete body.confirm_passwd;
        delete body.mail_username;
        delete body.mail_domain;

        console.log('------------');
        console.log(body);

        // insert 
        await model.insertMany(body)

    } catch (err) {
        throw err;
    }
}
