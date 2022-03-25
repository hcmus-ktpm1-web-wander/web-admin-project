const model = require('./adminModel')


module.exports.getAdminInfo = async () => {
    try {
        console.log('> get admin info');
        const admin_info = await model.find();
        return admin_info;
    } catch (err) {
        throw err;
    }
}

module.exports.checkPasswd = async (passwd, db_acc) => {
    try {
        console.log('> check password');
        if (passwd === db_acc.passwd)
            return true;
        else
            return false;
    } catch (err) {
        throw err;
    }
}