const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const customer = new Schema({
    username: String,
});

module.exports = mongoose.model('customer', customer, 'customer');