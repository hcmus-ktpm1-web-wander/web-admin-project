const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    fname: String,
    lname: String,
    username: String,
    email: String,
    role: String,
    employed: String,
    avatar_url: String,
    address: String,
    fullname: String,
    phone: String,
    intro: String,
});

module.exports = mongoose.model('user', user, 'user');