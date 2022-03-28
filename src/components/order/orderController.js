
const service = require('./orderService');
const utils = require("../user-manage/user_manageUtils");


// Render order
exports.renderOrder = async (req, res) => {
    const orders = await service.getOrders();
    const page = parseInt(req.query.page) || 1;
    const result = utils.paging(orders, page);
    res.render("order/views/order", { active: { Order: true }, page: "Order", result });
};

