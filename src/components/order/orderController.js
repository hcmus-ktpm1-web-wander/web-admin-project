
const service = require('./orderService');
const utils = require("../user-manage/user_manageUtils");


// Render order
exports.renderOrder = async (req, res) => {
    try {
        const orders = await service.getOrders();
        const page = parseInt(req.query.page) || 1;
        const result = utils.paging(orders, page);
        res.render("order/views/order", { active: { Order: true }, page: "Order", result });
    }catch (e) {
        res.status(500).json({ message: e.message });
    }
};

