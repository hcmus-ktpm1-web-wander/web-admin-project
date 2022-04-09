const service = require('./orderService');
const utils = require("../user-manage/user_manageUtils");


/**
 * render the order page
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.renderOrder = async (req, res) => {
    try {
        console.log("-- render order --");
        const orders = await service.getOrders();
        console.log(orders);

        const page = parseInt(req.query.page) || 1;

        const result = utils.paging(orders, page);
        console.log(result);

        res.render("order/views/order", { active: { Order: true }, page: "Order", result });

    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

/**
 * change the status of the order
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.changeStatus = async (req, res) => {
    try {
        await service.updateOrder(req.params.id, req.body.type);
        res.redirect("back");
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
}

