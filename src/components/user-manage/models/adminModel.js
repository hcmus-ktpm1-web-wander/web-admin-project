const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const admin = new Schema({
    _id: String,
    fname: String,
    lname: String,
    username: String,
    email: String,
    role: String,
    addr: String,
    phone_num: String,
    employed: Date

});

module.exports = mongoose.model('admin', admin, 'admin');