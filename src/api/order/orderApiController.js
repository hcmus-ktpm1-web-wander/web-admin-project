const orderService = require('../../components/order/orderService');
const pagination = require('../../public/js/paging');

module.exports.getOrders = async (req, res) => {
    try {
        const sort = parseInt(req.query.sort || 0)
        const status_filter = JSON.parse(req.query.status)

        const start = JSON.parse(req.query.start)
        const end = JSON.parse(req.query.end)

        const user_name = JSON.parse(req.query.username)

        const product = await orderService.getOrders(sort,status_filter, start, end ,user_name);
        const page = parseInt(req.query.page || 1);
        const result = pagination.paging(product, page, 8);
        console.log(result);
        res.send({ result });
    } catch (error) {
        res.status(500).send({ message: 'Error in the request' });
    }
}

module.exports.updateOrderStatus = async (req,res) => {
    try {
        await orderService.updateOrderStatus(req.body.orderID, req.body.status)
        res.send({message: "success"})
    }
    catch (e) {
        res.status(500).json({message: e.message});
    }
}
