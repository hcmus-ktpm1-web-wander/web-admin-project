const model = require('./product_manageModel');
const cloudinary = require('../../config/cloudinary.config');
const mongoose = require('mongoose');

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
 * Get all admin or user
 * @param username {string:{Admin, User}}
 * @returns {Promise<[Admin-User: model]>}
 */
module.exports.checkUsername = async (username) => {
    try {
        return await model.findOne({ username }).lean();
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

/**
 * insert user
 * @param file{path: String}
 * @param body{_id, name, email, password, role, employed, phone, address}
 * @returns {Promise<void>}
 */
module.exports.addUser = async (body, file) => {
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
            // default avatar
            url = 'https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg';
        }

        // get datetime
        const now = (new Date()).toString().split(" ");
        const gen_id = new mongoose.Types.ObjectId().toHexString();

        // check email
        if (body.mail_username !== '' && body.mail_domain !== "") {
            body.mail_domain = '@' + body.mail_domain;
        } else if (body.mail_username !== '' && body.mail_domain === "") {
            body.mail_domain = '@gmail.com';
        }

        // body to model
        body["_id"] = gen_id;
        body['fullname'] = body.fname + ' ' + body.lname;
        body["role"] = body.role;
        body['email'] = body.mail_username + body.mail_domain;
        body['employed'] = now[2] + ' ' + now[1] + ', ' + now[3];
        body['avatar_url'] = url;

        // delete unnecessary field
        delete body.fname;
        delete body.lname;
        delete body.passwd;
        delete body.confirm_passwd;
        delete body.mail_username;
        delete body.mail_domain;

        // insert 
        await model.insertMany(body)

    } catch (err) {
        throw err;
    }
}
