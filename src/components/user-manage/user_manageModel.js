const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const user = new Schema({
    username: String,
    password: String,
    email: String,
    role: String,
    employed: String,
    avatar_url: String,
    address: String,
    fullname: String,
    phone: String,
    intro: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('user', user, 'user');