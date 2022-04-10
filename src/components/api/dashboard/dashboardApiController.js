const orderService = require("../../order/orderService");
const userService = require("../../user/userService");
const productService = require('../../product/productService');

/**
 *  get dashboard
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getDashboard = async (req, res) => {
    try {
        console.log("-- dashboard api - get dashboard --");

        // fetch database
        const orders = await orderService.getOrders();
        const products = await productService.getProducts();
        const users = await (await userService.getInfo("User")).concat(await userService.getInfo("Admin"));

        const now = (new Date()).toString().split(" ");
        const today = now[2] + ' ' + now[1] + ',' + now[3];
        const this_month = now[1] + ',' + now[3];

        // total user
        const total_user = users.length;

        //total product 
        const total_product = products.length;

        // total money + today's money + top 3 user + this month product
        let total = 0;
        let today_total = 0;
        let today_order = 0;
        let top_user = {};
        let month_order = [];
        let chart_label = [];
        let chart_bars_data = [];
        let chart_lines_data = {
            "Bags": [],
            "Clothing": [],
            "Accessories": [],
            "Shoes": []
        };

        // year sale
        console.log("year sales");
        const date = new Date();
        for (i = date.getMonth(); i >= 0; i--) {
            const d = new Date(date.getFullYear(), date.getMonth() - i, 1).toString().split(" ");
            const this_month = d[1] + ',' + d[3];

            console.log("pre month:", this_month);
            let tt = 0;

            let category = {
                "Bags": 0,
                "Clothing": 0,
                "Accessories": 0,
                "Shoes": 0
            };

            orders.forEach(order => {
                if (order.create_date.includes(this_month)) {
                    tt += order.total;

                    // chart lines
                    for (let j = 0; j < order.products.length; j++) {
                        category[order.products[j].detail.category] += order.products[j].quantity;
                    }
                }
            });

            chart_label.push(d[1]);
            chart_bars_data.push(tt);
            chart_lines_data["Bags"].push(category["Bags"]);
            chart_lines_data["Clothing"].push(category["Clothing"]);
            chart_lines_data["Accessories"].push(category["Accessories"]);
            chart_lines_data["Shoes"].push(category["Shoes"]);
        }


        orders.forEach(order => {
            // total money 
            total += order.total;

            // today's money
            if (order.create_date == today) {
                today_total += order.total;
                today_order += 1;
            }

            // top user + this month product
            if (order.create_date.includes(this_month)) {
                // top user
                if (top_user[order.customer_id] == undefined) {
                    let user = users.find(element => element._id == order.customer_id);

                    top_user[order.customer_id] = {
                        fullname: user.fullname,
                        username: user.username,
                        avatar_url: user.avatar_url,
                        total: Math.round(order.total * 100) / 100,
                        order: 1
                    }
                } else {
                    top_user[order.customer_id].total += order.total;
                    top_user[order.customer_id].order += 1;
                }

                // this month order
                month_order.push({
                    order_id: order._id,
                    total: order.total,
                    create_date: order.create_date
                })
            }
        });

        total = Math.round(total * 100) / 100;
        today_total = Math.round(today_total * 100) / 100;

        // today's new client
        let today_new_client = 0;
        users.forEach(user => {
            if (user.employed == today) {
                today_new_client++;
            }
        })

        // Create items array
        var top_three_user = Object.keys(top_user).map(function (key) {
            return [key, top_user[key]];
        });
        // Sort the array based on the second element
        for (let i = 0; i < top_three_user.length - 1; i++) {
            for (let j = i + 1; j < top_three_user.length; j++) {
                if (top_three_user[i][1].total < top_three_user[j][1].total) {
                    let temp = top_three_user[i];
                    top_three_user[i] = top_three_user[j];
                    top_three_user[j] = temp;
                }
            }
        }

        console.log("total user", total_user);
        console.log("total:", total);
        console.log("total product:", total_product);
        console.log("today_total: ", today_total);
        // console.log("today_order: ", today_order);
        // console.log("top_user: ", top_user);
        // console.log("month_product: ", month_order);
        console.log("today_new_client: ", today_new_client);
        console.log("chart bars: ", chart_label, chart_bars_data);
        console.log("chart lines: ", chart_label, chart_lines_data);


        res.send({
            total_user, total, total_product, today_total, today_order, top_three_user, month_order, today_new_client, chart_label, chart_bars_data, chart_lines_data
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}