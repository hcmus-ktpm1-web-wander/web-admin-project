const productModel = require('./product_manageModel');
const cloudinary = require('../../config/cloudinary.config');
const mongoose = require('mongoose');



/**
 * Get all admin or user
 * @param role {string:{Admin, User}}
 * @returns {Promise<[Admin-User: model]>}
 */
module.exports.getProducts = async (id = null) => {
    try {
        if (id === null) {
            const products = await productModel.find().lean();
            for (let i = 0; i < products.length; i++) {
                products[i].thumbnail = products[i].img[0];
            }

            return products;
        } else {
            const product = await productModel.findById(id).lean();

            // remove first img
            product.thumbnail = product.img[0];
            var theRemovedElement = product.img.shift();

            return product;
        }

    } catch (err) {
        throw err;
    }
}