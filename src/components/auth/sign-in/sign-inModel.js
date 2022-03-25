const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const admin = new Schema({
    usrname: String,
    passwd: String,
});

module.exports = mongoose.model('admin_account', admin, 'admin_account');