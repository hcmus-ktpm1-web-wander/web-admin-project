const productService = require('../../components/product/productService');
const pagination = require('../../public/js/paging');

module.exports.getProducts = async (req,res)=>{
    try {
        const page =  parseInt(req.query.page || 1);
        const category = JSON.parse(req.query.category) || [];
        const brand = JSON.parse(req.query.brand) || [];
        const min_price = req.query.min || 0;
        const max_price = req.query.max || 99999999;

        const product = await productService.getProducts(req.query.sort,category,brand,min_price,max_price);
        const result = pagination.paging(product,page,6);
        res.send({result});
    } catch (error) {
        res.status(500).send({message: 'Error in the request'});
    }
}
