
const service = require('./orderService');


// Render order
exports.renderOrder = async (req, res) => {
    const orders = await service.getOrders();
    res.render("order/views/order", { active: { Order: true }, page: "Order", orders });
};

