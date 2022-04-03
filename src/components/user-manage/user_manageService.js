const model = require('./user_manageModel');
const cloudinary = require('../../config/cloudinary.config');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

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
 * get user by username
 * @param username {string}
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
 * @param body{object}
 * @param file{object}
 * @returns {Promise<void>}
 */
module.exports.addUser = async (body, file) => {
    try {
        const url = await cloudinary.upload(file.path, 'user_avatar');

        // get datetime
        const now = (new Date()).toString().split(" ");
        new mongoose.Types.ObjectId().toHexString();

        // check email
        if (body.mail_username !== '' && body.mail_domain !== "") {
            body.mail_domain = '@' + body.mail_domain;
        } else if (body.mail_username !== '' && body.mail_domain === "") {
            body.mail_domain = '@gmail.com';
        }

        // body to model
        body['fullname'] = body.fname + ' ' + body.lname;
        body["role"] = body.role;
        body['email'] = body.mail_username + body.mail_domain;
        body['employed'] = now[2] + ' ' + now[1] + ',' + now[3];
        body['avatar_url'] = url;
        body['phone'] = body.phone.replace(/\D/g, '');
        body['intro'] = "";
        body['username'] = body.username;

        await bcrypt.hash(body.passwd, 4).then(async (hash) => {
            body['password'] = hash;

            // delete unnecessary field
            delete body.fname;
            delete body.lname;
            delete body.passwd;
            delete body.confirm_passwd;
            delete body.mail_username;
            delete body.mail_domain;

            await model.create(body);
        });
        // // insert
        // await model.insertMany(body)

    } catch (err) {
        throw err;
    }
}