const orderService = require("../../order/orderService");

module.exports.getOrders = async (req, res) => {
    console.log("-- api order - get Orders --");
    const orders = await orderService.getOrders();
    console.log("orders: ", orders);

    res.send(orders);
}
