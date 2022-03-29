const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const order = new Schema({
    customer_id: String,
    date: String,
    status: Boolean,
    total: Number,
    products: [{
        product_id: String,
        quantity: Number
    }]

});

module.exports = mongoose.model('order', order, 'order');