const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const admin = new Schema({
    _id: String,
    usrname: String,
    passwd: String,
    account_id: String
});

module.exports = mongoose.model('admin_account', admin, 'admin_account');