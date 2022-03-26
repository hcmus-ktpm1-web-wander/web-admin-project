const model = require('./models/adminModel');
const cloudinary = '../../config/cloudinary.config.js';

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
