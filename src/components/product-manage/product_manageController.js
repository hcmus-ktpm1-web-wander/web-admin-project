const service = require('./product_manageService');
const { validationResult } = require('express-validator');
/************************************* GET methods *************************************/
/**
 *  get product information list
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderProductManage = async (req, res) => {
    try {
        const products = await service.getProducts();
        res.render("product-manage/views/product", { active: { ProductManage: true }, page: "Product manage", products });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/**
 *  render product edit page
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderProductDetailEdit = async (req, res) => {
    try {
        const product = await service.getProducts(req.params.productID);
        res.render("product-manage/views/product_detail", { active: { ProductManage: true, editProduct: true }, page: "Product detail/edit", product });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/**
 *  get product information by id
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.renderProductDetail = async (req, res) => {
    try {
        const product = await service.getProducts(req.params.productID);
        res.render("product-manage/views/product_detail", { active: { ProductManage: true }, page: "Product detail", product });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/************************************* GET methods *************************************/
/**
 *  add new product
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.addProduct = async (req, res) => {
    try {
        await service.addProduct(req.body, req.files);
        res.redirect('back');
    }
    catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/************************************* PUT methods *************************************/

/**
 *  edit product information
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.editProduct = async (req, res) => {
    try {
        await service.changeProductInfo(req.params.productID, req.body, req.files, req.body.exist_img);
        res.redirect('back');
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/************************************* DELETE methods *************************************/
/**
 *  delete product by id
 *
 * @param req request
 * @param res response
 * @returns {Promise<void>}
 */
exports.deleteProduct = async (req, res) => {
    try {
        await service.deleteProduct(req.params.productID);
        res.redirect('/product');
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

