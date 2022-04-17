const orderService = require('../../components/order/orderService');
const pagination = require('../../public/js/paging');

module.exports.getOrders = async (req, res) => {
    try {
        const product = await orderService.getOrders();
        const page = parseInt(req.query.page || 1);
        const result = pagination.paging(product, page, 8);
        console.log(result);
        res.send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error in the request' });
    }
}
exports.updateOrderStatus = async (req,res) => {
    try {
        await orderService.updateOrderStatus(req.body.orderID, req.body.status)
        res.send({message: "success"})
    }
    catch (e) {
        res.status(500).json({message: e.message});
    }
}