const model = require('./models/adminModel');


module.exports.getAdminInfo = async () => {
    try {
        return await model.find().lean();
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
        await model.findByIdAndUpdate({ _id: id }, {$set:{ role: body.to_role }})
            .then(() => {
                console.log("> Changed", id, "-> role:", body.to_role);
            });
    } catch (err) {
        throw err;
    }
}
