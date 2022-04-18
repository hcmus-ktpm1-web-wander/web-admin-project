const orderModel = require('./orderModel');
const userModel = require('../user/userModel');
const productModel = require("../product/models/productModel");

/**
 * get all orders
 * @returns {Promise<Object>}
 */
module.exports.getOrders = async (sort = 0) => {
    try {
        console.log("getOrders");
        let orders = null
        //fetch all data
        if (sort == 2) //status sort
            orders = await orderModel.find().sort({status: 1}).lean();
        else if(sort != 0) //created sort
            orders = await orderModel.find().sort({create_date: sort}).lean();
        else //non sort
            orders = await orderModel.find().lean();

        const products = await productModel.find().lean();
        const customers = await userModel.find().lean();

        for (let i = 0; i < orders.length; i++) {
            // get customer name
            const customer = customers.find(customer => customer._id == orders[i].customer._id);
            console.log(customer);
            if (customer) {
                orders[i].customer_name = customer.username;
            } else {
                orders[i].customer_name = "__guest";
            }

            let total = 0;

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

module.exports.updateOrderStatus = async (orderID, status) => {
    try
    {
        await orderModel.updateOne({_id: orderID},{status: status})
    }catch (e) {
        throw e
    }
}

module.exports.sortByCreatedAt = async (sort) => {
    try
    {
        await orderModel.find({}).sort({create_date: sort}).lean()
    }
    catch (e)
    {
        throw e
    }
}

