const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    fullname: String,
    username: String,
    password: String,
    email: String,
    role: String,
    employed: String,
    avatar_url: String,
    address: String,
    phone: String,
    intro: String,
});

module.exports = mongoose.model('user', user, 'user');