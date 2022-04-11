const orderModel = require('./orderModel');
const userModel = require('../user/userModel');
const productModel = require("../product/productModel");

/**
 * calculate total price of order
 * @param products {Object}
 * @returns {Promise<Number>}
 */
// module.exports.caclOrderTotal = async (products) => {
//     let total = 0;
//     for (let i = 0; i < products.length; i++) {
//         const product = await productModel.findById(products[i].product_id).lean();
//         total += product.price * products[i].quantity;
//     }
//     return total;
// }

/**
 * get all orders
 * @returns {Promise<Object>}
 */
module.exports.getOrders = async () => {
    try {
        //fetch all data
        const orders = await orderModel.find().lean();
        const products = await productModel.find().lean();
        const customers = await userModel.find().lean();

        for (let i = 0; i < orders.length; i++) {
            // get customer name
            const customer = customers.find(customer => customer._id == orders[i].customer_id);
            orders[i].customer_name = customer.username;

            var total = 0;

            // get product
            for (let j = 0; j < orders[i].products.length; j++) {
                orders[i].products[j].detail = products.find(product => product._id == orders[i].products[j].product_id);
                orders[i].products[j].thumbnail = orders[i].products[j].detail.img[0];

                total += orders[i].products[j].detail.price * orders[i].products[j].quantity;
            }

            // calculate total
            orders[i].total = Math.round(total * 100) / 100;
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

/**
 * update order status
 * @param id {String}
 * @param type {String}
 * @returns {Promise<void>}
 */
module.exports.updateOrder = async (id, type) => {
    try {
        await orderModel.findByIdAndUpdate(id, { status: type });
    } catch (err) {
        throw err;
    }
}