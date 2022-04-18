const orderModel = require('./orderModel');
const userModel = require('../user/userModel');
const productModel = require("../product/models/productModel");

/**
 * get all orders
 * @returns {Promise<Object>}
 */
module.exports.getOrders = async (sort = 0, status = null, start = null, end = null, user_name = null) => {
    try {
        if (start == null)
            start = "1970-01-01"
        if (end == null)
            end = "2099-01-01"

        let date_split = start.split('-')
        start = new Date(date_split[0], date_split[1] - 1, date_split[2])

        date_split = end.split('-')
        end = new Date(date_split[0], date_split[1] - 1, date_split[2])

        let orders = null
        //fetch all data
        if (sort == 2) //status sort
        {
            if (status != null)
                orders = await orderModel.find({$and: [{status: {"$in": status}}, {create_date: {$gte: start}}, {create_date: {$lte: end}}]}).sort({status: 1}).lean();
            else
                orders = await orderModel.find({$and: [{create_date: {$gte: start}}, {create_date: {$lte: end}}]}).sort({status: 1}).lean();
        }

        else if(sort != 0) //created sort
        {
            if (status != null)
                orders = await orderModel.find({$and: [{status: {"$in": status}}, {create_date: {$gte: start}}, {create_date: {$lte: end}}]}).sort({create_date: sort}).lean();
            else
                orders = await orderModel.find({$and: [{create_date: {$gte: start}}, {create_date: {$lte: end}}]}).sort({create_date: sort}).lean();
        }

        else //non sort
        {
            if (status != null)
                orders = await orderModel.find({$and: [{status: {"$in": status}}]}).lean();
            else
                orders = await orderModel.find().lean();
        }

        const products = await productModel.find().lean();

        for (let i = 0; i < orders.length; i++) {
            let total = 0;
            // get product and total
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

