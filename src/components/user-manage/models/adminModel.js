const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const admin = new Schema({
    username: String,
    email: String,
    role: String,
    employed: Date

});

module.exports = mongoose.model('admin', admin, 'admin');