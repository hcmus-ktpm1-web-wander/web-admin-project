const model = require('./sign-inModel')


module.exports.getUsrname = async (usrname) => {
    try {
        console.log('> get Username');
        const db_usrname = await model.findOne({ 'usrname': usrname });;
        return db_usrname;
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