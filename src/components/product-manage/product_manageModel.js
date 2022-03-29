const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const product = new Schema({
    price: Number,
});

module.exports = mongoose.model('product', product, 'product');