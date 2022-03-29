const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const product = new Schema({
    name: String,
    price: Number,
    color: String,
    category: String,
    brand: String,
    size: String,
    img: [String],
}, {
    versionKey: false // You should be aware of the outcome after set to false
});

module.exports = mongoose.model('product', product, 'product');