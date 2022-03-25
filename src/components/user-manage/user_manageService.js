const model = require('./models/adminModel');


module.exports.getAdminInfo = async () => {
    try {
        return await model.find().lean();
    } catch (err) {
        throw err;
    }
}
