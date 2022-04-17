const orderService = require('./orderService');
const utils = require("../../public/js/paging");

/**
 * render the order page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.renderOrder = async (req, res) => {
    try {
        const orders = await orderService.getOrders();
        const page = parseInt(req.query.page) || 1;
        const result = utils.paging(orders, page, 8);
        res.render("order/views/order", {active: {Order: true}, page: "Order", result});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
};


