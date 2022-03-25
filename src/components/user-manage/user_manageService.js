const model = require('./models/adminModel');


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
        return;
    } catch (err) {
        throw err;
    }
}

module.exports.changeRole = async (id, body) => {
    try {
        console.log('> change role', body.to_role);
        await model.findByIdAndUpdate({ _id: id }, { $set: { role: body.to_role } })
            .then(() => {
                console.log("> Changed", id, "-> role:", role);
            });
        return;
    } catch (err) {
        throw err;
    }
}
