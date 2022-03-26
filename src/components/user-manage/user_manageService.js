const model = require('./models/adminModel');
const mongoose = require("mongoose");
const cloudinary = '../../config/cloudinary.config.js';
const utils = './user_manageUtils.js';

module.exports.getInfo = async (role) => {
    try {
        return await model.find({ role }).lean();
    } catch (err) {
        throw err;
    }
}

module.exports.deleteUser = async (id) => {
    try {
        await model.find({ _id: id }).remove()
            .then(() => { console.log("> Deleted", id); });
    } catch (err) {
        throw err;
    }
}

module.exports.changeRole = async (id, body) => {
    try {
        console.log('> change role', body.to_role);
        await model.findByIdAndUpdate({ _id: id }, { $set: { role: body.to_role } })
            .then(() => {
                console.log("> Changed", id, "-> role:", body.to_role);
            });
    } catch (err) {
        throw err;
    }
}

UploadImage = async (image) => {
    cloudinary.uploader.upload(image)
        .then((result) => {
            response.status(200).send({
                message: "success",
                result,
            });
        }).catch((error) => {
            response.status(500).send({
                message: "failure",
                error,
            });
        });
}

module.exports.addUser = async (body) => {
    try {
        console.log('> Add user');

        // const objectID = await new mongoose.Types.ObjectId();


        // upload image
        // await UploadImage(body.avatar_url);

        // admin.avatar_url = url;

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
        // await model.insertMany(body)


        return;
    } catch (err) {
        throw err;
    }
}
