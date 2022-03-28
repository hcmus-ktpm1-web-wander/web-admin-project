const orderModel = require('./orderModel');
const customerModel = require('./customerModel');
const productModel = require("../product-manage/product_manageModel");

module.exports.caclOrderTotal = async (products) => {
    let total = 0;

    for (let i = 0; i < products.length; i++) {
        const product = await productModel.findById(products[i].product_id).lean();
        total += product.price * products[i].quantity;
    }

    return total;
}


module.exports.getOrders = async () => {
    try {
        const orders = await orderModel.find().lean();

        for (let i = 0; i < orders.length; i++) {
            // get customer name
            const customer = await customerModel.findById(orders[i].customer_id).lean();
            orders[i].customer_name = customer.username;

            // caclulate total
            const total = await this.caclOrderTotal(orders[i].products);
            orders[i].total = Math.round(total * 100) / 100;

            // get product
            for (let j = 0; j < orders[i].products.length; j++) {
                orders[i].products[j].detail = await productModel.findById(orders[i].products[j].product_id).lean();
                orders[i].products[j].thumbnail = orders[i].products[j].detail.img[0];
            }
        }

        return orders;

    } catch (err) {
        throw err;
    }
}