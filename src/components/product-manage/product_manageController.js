const service = require('./product_manageService');
const { validationResult } = require('express-validator');
/************************************* GET methods *************************************/

exports.renderProductManage = async (req, res) => {
    try {
        res.render("product-manage/views/product", { active: { ProductManage: true }, page: "Product manage" });

    } catch (e) {
        res.render("error", { error: e });
    }
};
