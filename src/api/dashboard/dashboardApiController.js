const orderService = require("../../components/order/orderService");
const userService = require("../../components/user/userService");
const productService = require('../../components/product/productService');

/**
 *  get dashboard
 *
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
module.exports.getDashboard = async (req, res) => {
    try {
        console.log('-- dashbord api - getDashboard');
        // fetch database
        const orders = await orderService.getOrders();
        const products = await productService.getProducts();
        const users = (await userService.getInfo("User")).concat(await userService.getInfo("Admin"));
        var period = req.query.period;

        // total user
        const total_user = users.length;

        //total product 
        const total_product = products.length;

        let chart_label = [];
        let chart_bars_data = [];
        let chart_lines_data = {
            "Bags": [],
            "Clothing": [],
            "Accessories": [],
            "Shoes": []
        };

        const present = new Date();
        const now = (new Date()).toString().split(" ");

        const pre = period;

        if (period == "Today") {
            period = now[2] + ' ' + now[1] + ',' + now[3];
            chart_label.push(now[2] + ' ' + now[1] + ',' + now[3]);
        } else if (period == "Week") {
            period = this.getWeek(new Date());
            chart_label.push("Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday");

        } else if (period == "Month") {
            period = now[1] + ',' + now[3];
            const date = new Date();
            const dayOfMonth = this.daysInMonth(date.getMonth() + 1, date.getFullYear());
            for (let i = 1; i <= dayOfMonth; i++)
                chart_label.push(i);

        } else if (period == "Year") {
            period = now[3];
            chart_label.push("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        }

        // total money + period's money + top 3 user + this period product
        let total = 0;
        let period_total = 0;
        let period_total_order = 0;
        let period_order = [];
        let top_user = {};
        let period_new_client = 0;

        // period's new client
        users.forEach(user => {
            if ((pre == "Week" && this.isDateInWeek(user.employed)) ||
                (pre != "Week" && user.employed.includes(period))) {
                period_new_client++;
            }
        })

        // total money + period's money + top 3 user + this period product
        orders.forEach(order => {
            // total money 
            total += order.total;

            console.log("user -:", this.getWeek(present), ' com ', this.isDateInWeek(order.create_date), order.create_date);
            if ((pre == "Week" && this.isDateInWeek(order.create_date)) ||
                (pre != "Week" && order.create_date.includes(period))) {
                // total + order
                period_total += order.total;
                period_total_order += 1;

                // top user
                if (top_user[order.customer_id] === undefined) {
                    let user = users.find(element => element._id == order.customer_id);

                    if (user !== undefined) {
                        top_user[order.customer_id] = {
                            fullname: user.fullname,
                            username: user.username,
                            avatar_url: user.avatar_url,
                            total: Math.round(order.total * 100) / 100,
                            order: 1
                        }
                    }
                } else {
                    top_user[order.customer_id].total += order.total;
                    top_user[order.customer_id].order += 1;
                }

                // this period order
                period_order.push({
                    order_id: order._id,
                    total: order.total,
                    create_date: order.create_date,
                    promo: order.promo
                })
            }
        });

        // chart
        if (pre == "Today") { //done
            let category = {
                "Bags": 0,
                "Clothing": 0,
                "Accessories": 0,
                "Shoes": 0
            };

            orders.forEach(order => {
                if (order.create_date.includes(period)) {
                    // chart lines
                    for (let j = 0; j < order.products.length; j++) {
                        category[order.products[j].detail.category] += order.products[j].quantity;
                    }
                }
            });

            chart_bars_data.push(Math.round(period_total * 100) / 100);
            chart_lines_data["Bags"].push(category["Bags"]);
            chart_lines_data["Clothing"].push(category["Clothing"]);
            chart_lines_data["Accessories"].push(category["Accessories"]);
            chart_lines_data["Shoes"].push(category["Shoes"]);
        } else if (pre == "Week") { //done
            curr = new Date;
            const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 1));
            const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 7));

            for (i = 1; ; i++) {
                const d = new Date(curr.setDate(curr.getDate() - curr.getDay() + i));
                const dd = d.toString().split(" ");
                var this_date = dd[2] + ' ' + dd[1] + ',' + dd[3];

                if (i == 1) {
                    monday = firstday.toString().split(" ");
                    this_date = monday[2] + ' ' + monday[1] + ',' + monday[3];
                }

                let tt = 0;

                let category = {
                    "Bags": 0,
                    "Clothing": 0,
                    "Accessories": 0,
                    "Shoes": 0
                };

                orders.forEach(order => {
                    if (this.isDateInWeek(order.create_date) && order.create_date.includes(this_date)) {
                        // chart bars
                        tt += order.total;

                        // chart lines
                        for (let j = 0; j < order.products.length; j++) {
                            category[order.products[j].detail.category] += order.products[j].quantity;
                        }
                    }
                });

                chart_bars_data.push(tt);
                chart_lines_data["Bags"].push(category["Bags"]);
                chart_lines_data["Clothing"].push(category["Clothing"]);
                chart_lines_data["Accessories"].push(category["Accessories"]);
                chart_lines_data["Shoes"].push(category["Shoes"]);


                if (d.toString().split(" ")[2] == lastday.toString().split(" ")[2])
                    break;
            }
        } else if (pre == "Month") { // done
            const date = new Date();
            const dayOfMonth = this.daysInMonth(date.getMonth() + 1, date.getFullYear());

            for (i = 1; i <= dayOfMonth; i++) {
                const d = new Date(date.getFullYear(), date.getMonth(), i).toString().split(" ");
                const this_date = d[2] + ' ' + d[1] + ',' + d[3];
                let tt = 0;

                let category = {
                    "Bags": 0,
                    "Clothing": 0,
                    "Accessories": 0,
                    "Shoes": 0
                };

                orders.forEach(order => {
                    if (order.create_date.includes(this_date)) {
                        // chart bars
                        tt += order.total;

                        // chart lines
                        for (let j = 0; j < order.products.length; j++) {
                            category[order.products[j].detail.category] += order.products[j].quantity;
                        }
                    }
                });

                chart_bars_data.push(tt);
                chart_lines_data["Bags"].push(category["Bags"]);
                chart_lines_data["Clothing"].push(category["Clothing"]);
                chart_lines_data["Accessories"].push(category["Accessories"]);
                chart_lines_data["Shoes"].push(category["Shoes"]);
            }
        } else if (pre == "Year") { // done
            const date = new Date();
            for (i = 0; i < 12; i++) {
                const d = new Date(date.getFullYear(), i, 1).toString().split(" ");
                const this_date = d[1] + ',' + d[3];
                console.log("this_date: ", this_date);
                let tt = 0;

                let category = {
                    "Bags": 0,
                    "Clothing": 0,
                    "Accessories": 0,
                    "Shoes": 0
                };

                orders.forEach(order => {
                    if (order.create_date.includes(this_date)) {
                        // chart bars
                        tt += order.total;

                        // chart lines
                        for (let j = 0; j < order.products.length; j++) {
                            category[order.products[j].detail.category] += order.products[j].quantity;
                        }
                    }
                });

                chart_bars_data.push(tt);
                chart_lines_data["Bags"].push(category["Bags"]);
                chart_lines_data["Clothing"].push(category["Clothing"]);
                chart_lines_data["Accessories"].push(category["Accessories"]);
                chart_lines_data["Shoes"].push(category["Shoes"]);
            }
        }

        total = Math.round(total * 100) / 100;
        period_total = Math.round(period_total * 100) / 100;

        // Create items array
        const top_three_user = Object.keys(top_user).map(function (key) {
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

        res.send({
            total_user, total, total_product, period_total, period_total_order, period_order, top_three_user, period_new_client, period, chart_bars_data, chart_lines_data, chart_label
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports.getWeek = (currentdate) => {
    var oneJan = new Date(currentdate.getFullYear(), 0, 1);
    var numberOfDays = Math.floor((currentdate - oneJan) / (24 * 60 * 60 * 1000));
    var period = Math.ceil((currentdate.getDay() + 1 + numberOfDays) / 7);

    return period;
}

module.exports.isDateInWeek = (date) => {
    //https://www.timeanddate.com/date/weeknumber.html
    curr = new Date;
    var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
    var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));

    let d = date.split(" ");

    const day = d[0];
    const month = d[1].split(",")[0];
    const year = d[1].split(",")[1];

    const date_ = new Date(month + " " + day + ", " + year);

    if (date_ >= firstday && date_ <= lastday) {
        return true;
    }
    else
        return false
}

module.exports.daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
}