const service = require('./product_manageService');
const { validationResult } = require('express-validator');
/************************************* GET methods *************************************/

exports.renderProductManage = async (req, res) => {
    try {
        console.log('---- render product  ----');
        const products = await service.getProducts();
        console.log(products);

        res.render("product-manage/views/product", { active: { ProductManage: true }, page: "Product manage", products });

    } catch (e) {
        res.render("error", { error: e });
    }
};


exports.renderProductDetailEdit = async (req, res) => {
    try {
        console.log('---- render product detail edit ----');
        const product = await service.getProducts(req.params.productID);
        console.log(product);

        res.render("product-manage/views/product_detail", { active: { ProductManage: true, editProduct: true }, page: "Product detail/edit", product });

    } catch (e) {
        res.render("error", { error: e });
    }
};



exports.renderProductDetail = async (req, res) => {
    console.log('---- render product detail ----');
    try {

        const product = await service.getProducts(req.params.productID);
        console.log(product);

        res.render("product-manage/views/product_detail", { active: { ProductManage: true }, page: "Product detail", product });

    } catch (e) {
        res.render("error", { error: e });
    }
};

exports.editProduct = async (req, res) => {
    try {
        console.log('---- edit product ----');
        console.log("req.params", req.body);
        await service.changeProductInfo(req.params.productID, req.body);

        res.redirect('/product/' + req.params.productID);

    } catch (e) {
        res.render("error", { error: e });
    }
};

exports.addProduct = async (req, res) => {
    try {
        console.log('---- add product ----');
        console.log('req.body', req.body);

        // insert data to database
        await service.addUser(req.body, req.file);
        res.redirect('back');
    }
    catch (e) {
        res.render("error", { error: e });
    }
};


exports.deleteProduct = async (req, res) => {
    try {
        await service.deleteProduct(req.params.productID);
        res.redirect('/product');
    } catch (e) {
        res.render("error", { error: e });
    }
};

