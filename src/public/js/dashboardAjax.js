window.onload = getDashboard();

function getDashboard() {
    const url = '/api/dashboard';
    fetch(url, {
        method: "GET"
    }).then(r => r.json()).then(data => {
        console.log('Ajax getDashboard: ', data);

        $("#today-total").text('$' + data.today_total);
        $("#today-order").text(data.today_order);
        $("#today-new-client").text(data.today_new_client);
        $("#total-user").text(data.total_user);
        $("#total-sales").text('$' + data.total);
        $("#total-product").text(data.total_product);

        // top 3 user
        for (let i = 0; i < 3; i++) {
            let html = `
                <tr>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div>
                                <img src="${data.top_three_user[i][1].avatar_url}" class="avatar avatar-sm me-3"
                                    alt="xd">
                            </div>
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${data.top_three_user[i][1].fullname}</h6>
                                <span class="text-xs text-muted">@${data.top_three_user[i][1].username}</span>
                            </div>
                        </div>
                    </td>
                    <td>
                        ${data.top_three_user[i][1].order}
                    </td>
                    <td class="align-middle text-center text-sm">
                        <span class="text-xs font-weight-bold"> $${data.top_three_user[i][1].total} </span>
                    </td>
                </tr>`

            $("#top-three-user").append(html);
        }

        //this month order 
        try {
            for (let i = 0; i < 5; i++) {
                let html = `
                <div class="timeline-block mb-3">
                    <span class="timeline-step">
                        <i class="ni ni-money-coins text-dark text-gradient"></i>
                    </span>
                    <div class="timeline-content">
                        <h6 class="text-dark text-sm font-weight-bold mb-0">New order #${data.month_order[i].order_id}</h6>
                        <div class="d-flex font-weight-bold text-xs mt-1 mb-0">
                            <p class="text-secondary">${data.month_order[i].create_date}</p>
                            <p class="ms-3" style="font-weight: bold"> Total: ${data.month_order[i].total}</p>
                        </div>
                    </div>
                </div>`

                $("#month-order").append(html);
            }
        } catch (error) {
            console.log("error:", error);
        }

        //all this month order 
        for (let i = 0; i < data.month_order.length; i++) {
            let html = `
                <div class="timeline-block mb-3">
                    <span class="timeline-step">
                        <i class="ni ni-money-coins text-dark text-gradient"></i>
                    </span>
                    <div class="timeline-content">
                        <h6 class="text-dark text-sm font-weight-bold mb-0">New order #${data.month_order[i].order_id}</h6>
                        <div class="d-flex font-weight-bold text-xs mt-1 mb-0">
                            <p class="text-secondary">${data.month_order[i].create_date}</p>
                            <p class="ms-3" style="font-weight: bold"> Total: ${data.month_order[i].total}</p>
                        </div>
                    </div>
                </div>`

            $("#all-month-order").append(html);
        }

        // draw line
        drawCharBars(data.chart_label, data.chart_bars_data);
        drawCharLine(data.chart_label, data.chart_lines_data)
    });
}


function drawCharBars(label, data) {
    var ctx = document.getElementById("chart-bars").getContext("2d");
    const now = (new Date()).toString().split(" ");
    const year = now[3];

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: label,
            datasets: [{
                label: "Sales",
                tension: 0.4,
                borderWidth: 0,
                borderRadius: 4,
                borderSkipped: false,
                backgroundColor: "#fff",
                data: data,
                maxBarThickness: 6
            },],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Sales statistics in' + year,
                    color: "#fff"
                },
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                    },
                    ticks: {
                        beginAtZero: true,
                        padding: 15,
                        font: {
                            size: 14,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                        color: "#fff"
                    },
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false
                    },
                    ticks: {
                        display: false
                    },
                },
            },
        },
    });
}

function drawCharLine(label, data) {
    var ctx2 = document.getElementById("chart-line").getContext("2d");

    var gradientStroke1 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke1.addColorStop(1, 'rgba(203,12,159,0.2)');
    gradientStroke1.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke1.addColorStop(0, 'rgba(203,12,159,0)'); //purple colors

    var gradientStroke2 = ctx2.createLinearGradient(0, 230, 0, 50);

    gradientStroke2.addColorStop(1, 'rgba(20,23,39,0.2)');
    gradientStroke2.addColorStop(0.2, 'rgba(72,72,176,0.0)');
    gradientStroke2.addColorStop(0, 'rgba(20,23,39,0)'); //purple colors

    new Chart(ctx2, {
        type: "line",
        data: {
            labels: label,
            datasets: [{
                label: "Bags",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#cb0c9f",
                borderWidth: 3,
                backgroundColor: gradientStroke1,
                fill: true,
                data: data["Bags"],
                maxBarThickness: 6

            },
            {
                label: "Clothing",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#e4f478",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: data["Clothing"],
                maxBarThickness: 6
            },
            {
                label: "Accessories",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: data["Accessories"],
                maxBarThickness: 6
            },
            {
                label: "Shoes",
                tension: 0.4,
                borderWidth: 0,
                pointRadius: 0,
                borderColor: "#3A416F",
                borderWidth: 3,
                backgroundColor: gradientStroke2,
                fill: true,
                data: data["Shoes"],
                maxBarThickness: 6
            },
            ],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false,
                }
            },
            interaction: {
                intersect: false,
                mode: 'index',
            },
            scales: {
                y: {
                    grid: {
                        drawBorder: false,
                        display: true,
                        drawOnChartArea: true,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        padding: 10,
                        color: '#b2b9bf',
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
                x: {
                    grid: {
                        drawBorder: false,
                        display: false,
                        drawOnChartArea: false,
                        drawTicks: false,
                        borderDash: [5, 5]
                    },
                    ticks: {
                        display: true,
                        color: '#b2b9bf',
                        padding: 20,
                        font: {
                            size: 11,
                            family: "Open Sans",
                            style: 'normal',
                            lineHeight: 2
                        },
                    }
                },
            },
        },
    });
}