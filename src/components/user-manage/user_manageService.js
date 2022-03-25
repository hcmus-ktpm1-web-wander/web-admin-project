const model = require('./models/adminModel');


module.exports.getAdminInfo = async () => {
    try {
        console.log('> get admin info');
        const admin_info = await model.find().lean();
        return admin_info;
    } catch (err) {
        throw err;
    }
}
