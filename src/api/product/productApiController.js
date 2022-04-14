const productService = require('../../components/product/productService');
const pagination = require('../../public/js/paging');

module.exports.getProducts = async (req,res)=>{
    try {
        const product = await productService.getProducts(req.params.id);
        console.log(product.length)
        const page =  parseInt(req.query.page || 1);
        const result = pagination.paging(product,page,6);
        res.send({result});
    } catch (error) {
        res.status(500).send({message: 'Error in the request'});
    }
}