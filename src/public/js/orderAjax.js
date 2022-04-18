function paging(page, sort = 0, status_filter = null, start_date = null, end_date = null, user_name = null) {

    if (status_filter != null && status_filter.length == 0)
        status_filter = null

    fetch(`/api/order?page=${page}&sort=${sort}&status=${JSON.stringify(status_filter)}&start=${start_date}&end=${end_date}&username=${user_name}`, {
        method: "GET"
    }).then(r => r.json()).then(data => {

        $('#order-body').html('');
        data.result.data.forEach(function (item, index) {
            const number = (index + 1) + (page - 1) * 8;
            let str = `
            <tr id="${item._id}">
                <td>
                    <div class="d-flex px-2 py-1">
                        <div>
                            <span class="text-secondary text-xs font-weight-bold">${item._id}</span>
                        </div>

                    </div>
                </td>
                <td>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${item.username}</h6>
                    </div>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${item.create_date}</span>
                </td> `;

            if (item.status === 'Pending') {
                str += `<td class="align-middle text-center status-bar">
                        <span class="badge badge-sm bg-gradient-secondary w-70" style="border-width: 0;">${item.status}</span>
                    </td> `;
            } else if (item.status === 'Processing') {
                str += `<td class="align-middle text-center status-bar">
                        <span class="badge badge-sm bg-gradient-warning w-70" style="border-width: 0;">${item.status}</span>
                    </td> `;
            } else if (item.status === 'Completed') {
                str += `<td class="align-middle text-center status-bar">
                       <span class="badge badge-sm bg-gradient-success w-70" style="border-width: 0;">${item.status}</span>
                    </td> `;
            } else if (item.status === 'Canceled') {
                str += `<td class="align-middle text-center status-bar">
                        <span class="badge badge-sm bg-gradient-danger w-70" style="border-width: 0;">${item.status}</span>
                    </td>
                `;
            }

            if (item.promo !== undefined) {
                let discount = parseInt(item.promo.replace("%", ""));
                let tt = Math.round((item.total - discount * item.total / 100) * 100) / 100;

                str +=
                    `<td class="align-middle text-center">
                    <span>${tt}$</span>
                </td>`
            } else {
                str +=
                    `<td class="align-middle text-center">
                    <span>${item.total}$</span>
                </td>`
            }
            str +=
                `<td class="align-middle text-center text-sm">
                    <svg onclick="changeOrderStatus('${item._id}', 'Completed')" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                    viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
                        <circle style="fill:#6DC180;" cx="256" cy="256" r="256"/>
                        <path style="fill:#5CA15D;" d="M256,0v512c141.385,0,256-114.615,256-256S397.385,0,256,0z"/>
                        <polygon style="fill:#F2F2F4;" points="219.429,367.932 108.606,257.108 147.394,218.32 219.429,290.353 355.463,154.32 
                            394.251,193.108 "/>
                        <polygon style="fill:#DFDFE1;" points="256,331.361 394.251,193.108 355.463,154.32 256,253.782 "/>
                    </svg>
                    
                    <svg onclick="changeOrderStatus('${item._id}', 'Canceled')" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 506.4 506.4" style="enable-background:new 0 0 506.4 506.4;" xml:space="preserve">
                    <circle style="fill:#DF5C4E;" cx="253.2" cy="253.2" r="249.2"/>
                    <path style="fill:#F4EFEF;" d="M281.6,253.2l90.8-90.8c4.4-4.4,4.4-12,0-16.4l-11.2-11.2c-4.4-4.4-12-4.4-16.4,0L254,225.6
                        l-90.8-90.8c-4.4-4.4-12-4.4-16.4,0L135.6,146c-4.4,4.4-4.4,12,0,16.4l90.8,90.8L135.6,344c-4.4,4.4-4.4,12,0,16.4l11.2,11.6
                        c4.4,4.4,12,4.4,16.4,0l90.8-90.8l90.8,90.8c4.4,4.4,12,4.4,16.4,0l11.2-11.6c4.4-4.4,4.4-12,0-16.4L281.6,253.2z"/>
                    <path d="M253.2,506.4C113.6,506.4,0,392.8,0,253.2S113.6,0,253.2,0s253.2,113.6,253.2,253.2S392.8,506.4,253.2,506.4z M253.2,8
                        C118,8,8,118,8,253.2s110,245.2,245.2,245.2s245.2-110,245.2-245.2S388.4,8,253.2,8z"/>
                    <path d="M352.8,379.6c-4,0-8-1.6-11.2-4.4l-88-88l-88,88c-2.8,2.8-6.8,4.4-11.2,4.4c-4,0-8-1.6-11.2-4.4L132,364
                        c-2.8-2.8-4.4-6.8-4.4-11.2c0-4,1.6-8,4.4-11.2l88-88l-88-88c-2.8-2.8-4.4-6.8-4.4-11.2c0-4,1.6-8,4.4-11.2l11.2-11.2
                        c6-6,16.4-6,22,0l88,88l88-88c2.8-2.8,6.8-4.4,11.2-4.4l0,0c4,0,8,1.6,11.2,4.4l11.2,11.2c6,6,6,16,0,22l-88,88l88,88
                        c2.8,2.8,4.4,6.8,4.4,11.2c0,4-1.6,8-4.4,11.2l-11.2,11.2C360.8,378,357.2,379.6,352.8,379.6L352.8,379.6z M253.6,277.2
                        c1.2,0,2,0.4,2.8,1.2l90.8,90.8c1.6,1.6,3.2,2.4,5.6,2.4l0,0c2,0,4-0.8,5.6-2.4l11.6-11.6c1.6-1.6,2.4-3.2,2.4-5.6
                        c0-2-0.8-4-2.4-5.6l-90.8-90.8c-0.8-0.8-1.2-1.6-1.2-2.8s0.4-2,1.2-2.8l90.8-90.8c2.8-2.8,2.8-8,0-10.8l-11.2-11.2
                        c-1.6-1.6-3.2-2.4-5.6-2.4l0,0c-2,0-4,0.8-5.6,2.4L256.8,228c-1.6,1.6-4,1.6-5.6,0l-90.8-90.8c-2.8-2.8-8-2.8-10.8,0L138,148.4
                        c-1.6,1.6-2.4,3.2-2.4,5.6s0.8,4,2.4,5.6l90.8,90.8c1.6,1.6,1.6,4,0,5.6L138,346.8c-1.6,1.6-2.4,3.2-2.4,5.6c0,2,0.8,4,2.4,5.6
                        l11.6,11.6c2.8,2.8,8,2.8,10.8,0l90.8-90.8C251.6,277.6,252.4,277.2,253.6,277.2z"/>
                    </svg>
                    
                    <button class="button-add btn-view badge badge-sm bg-gradient-secondary"
                        data-bs-toggle="modal" data-bs-target='#order${number}'>View
                    </button>
                </td>
                <td>
                <div class="modal fade" id='order${number}' tabIndex="-1"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Order
                                    information
                                </h5>

                            </div>
                            <div class="modal-body">
                                <h6 class="mb-2"><b>ID: ${item._id}</b></h6>`

            if (item.customer._id !== undefined)
                str += `<div class="mb-1"><b>Customer ID:</b> ${item.customer._id}</div>`

            str += `<div class="mb-1"><b>Customer name:</b> ${item.customer.fullname}</div>
                                <div class="mb-1"><b>Customer email:</b> ${item.customer.email}</div>
                                <div class="mb-1"><b>Customer phone:</b> ${item.customer.phone}</div>
                                <div class="mb-1"><b>Customer address:</b> ${item.customer.address}</div>
                                <div class="mb-1"><b>Create at:</b> ${item.create_date}</div> `;

            if (item.status === 'Pending') {
                str += `<div class="mb-3"><b>Status:</b>
                        <<span class="badge badge-sm bg-gradient-secondary">${item.status}</span>
                    </div> `;
            } else if (item.status === 'Processing') {
                str += `<div class="mb-3"><b>Status:</b>
                        <span class="badge badge-sm bg-gradient-warning">${item.status}</span>
                    </div> `;
            } else if (item.status === 'Completed') {
                str += `<div class="mb-3"><b>Status:</b>
                        <span class="badge badge-sm bg-gradient-success">${item.status}</span>
                    </div> `;
            } else if (item.status === 'Canceled') {
                str += `<div class="mb-3"><b>Status:</b>
                        <span class="badge badge-sm bg-gradient-danger">${item.status}</span>
                    </div> `;
            }

            str +=
                `<div class="custom-table p-3 mb-3">
                    <div class="row">
                        <div class="col-7 ">
                            <b>Product</b>
                        </div>
                        <div class="col-3 ">
                            <b>Quantity</b>
                        </div>
                        <div class="col-2">
                            <b>Price</b>
                        </div>
                    </div>
                    <hr>
                    <div class="row">`;

            item.products.forEach(function (e, i) {
                str +=
                    `<div class="col-7">
                        <div class="row">
                            <div class="col product-image">
                                <img src="${e.thumbnail}" class="avatar avatar-sm"
                                     alt="thumnail">
                            </div>
                            <div
                                class="col-9 d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${e.detail.name}</h6>
                                <span
                                    class="text-secondary text-xs font-weight-bold">${e.detail._id}</span>
                            </div>
                        </div>
                    </div>
                <div class="col-3 align-middle text-center">
					<span class="text-secondary text-xs font-weight-bold">x${e.quantity}</span>
                </div>
                <div class="col-2 align-middle">
					<span class="text-secondary text-xs font-weight-bold">${e.detail.price}$</span>
                </div>
                <hr class="my-2">`
            });
            if (item.promo !== undefined) {
                let discount = parseInt(item.promo.replace("%", ""));
                let sale = Math.round(discount * item.total) / 100;
                let tt = Math.round((item.total - sale) * 100) / 100;
                str +=
                    `</div>
                    <div class="row">
                        <h6 class="col">Total:</h6>
                        <div class="col-3">
                            <h6 class="text-secondary font-weight-bold text-end pe-3">
                                ${item.total}$</h6>
                            <h6 class="text-secondary font-weight-bold text-end pe-3">
                                - ${sale}$
                            </h6>
                            <hr>
                            <h6 class="text-primary font-weight-bold text-end pe-3">
                                ${tt}$
                            </h6>
                        </div>
                    </div>
                </div>`
            }
            else {
                str +=
                    `</div>
                    <div class="row">
                        <h6 class="col">Total:</h6>
                        <div class="col-3">
                            <h6 class="text-primary font-weight-bold text-end pe-3">
                                ${item.total}$</h6>
                        </div>
                    </div>
                </div>`
            }
            str +=
                `</div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary"
                            data-bs-dismiss="modal">Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
       </td>
    </tr>`;


            $('#order-body').append(str);
        });


        $('#order-pagination').html(
            `<li class="page-item" style="${data.result.disablePrev} ">
                <button class="page-link" onClick="paging('${data.result.prev}')" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
    
            <li class="page-item ${data.result.hiddenPrev}"
                style="${data.result.disablePrev} ${data.result.numberPrev}">
                <button class="page-link"  onClick="paging('${data.result.prev}')"> ${data.result.prev} </button>
            </li>
    
            <li class="page-item active">
                <button class="page-link" onClick="paging('${data.result.page}')"> ${data.result.page} </button>
            </li>
            <li class="page-item ${data.result.hiddenNext}"
                style="${data.result.disableNext} ${data.result.numberNext}">
                <button class="page-link" onClick="paging('${data.result.next}')"> ${data.result.next} </button>
            </li>
            
            <li class="page-item" style="${data.result.disableNext}">
                <button class="page-link" onClick="paging('${data.result.next}')" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>`);

        $('#wait-screen').css("background-color", "white");
        $('#wait-screen').css("z-index", "-1");
    });
}

function changeOrderStatus(orderID, status)
{

    url = '/api/order/update'
    $.post(url, {orderID: orderID, status: status}, function (data){
        const order = $(`tr[id=${orderID}]`)

        const status_bar = $(`tr[id=${orderID}] .status-bar`)
        status_bar.empty()
        let html = ``
        if (status === 'Pending') {
            html = `<span class="badge badge-sm bg-gradient-secondary w-70" style="border-width: 0;">${status}</span>`;
        } else if (status === 'Processing') {
            html = `<span class="badge badge-sm bg-gradient-warning w-70" style="border-width: 0;">${status}</span> `;
        } else if (status === 'Completed') {
            html = `<span class="badge badge-sm bg-gradient-success w-70" style="border-width: 0;">${status}</span> `;
        } else if (status === 'Canceled') {
            html = `<span class="badge badge-sm bg-gradient-danger w-70" style="border-width: 0;">${status}</span>`;
        }
        status_bar.html(html)

    }).fail(function (data){
        if (data.status === 500)
            alert("Failed")
    })
}

function checkAll() {
    let status_filter = []
    let start_date = null
    let end_date = null
    let user_name = null

    //checkboxes check
    const status_check_boxes = $('.status input[type=checkbox]')
    status_check_boxes.each(function () {
        const id = $(this).attr('id')
        if ($(this).is(':checked'))
            status_filter.push(id)
    })

    //input date check
    const date_range_inputs = $('.date-input')
    date_range_inputs.each(function () {
        const name = $(this).attr('name')
        const value = $(this).val()
        if (name == 'start-date')
            start_date = value
        else if (name == 'end-date')
            end_date = value

    })

    //input username check
    const user_name_input = $('.user-name-input')
    const value = user_name_input.val()
    user_name = value

    //dropdown check
    const select = $('select')
    const sort = select.val()

    return {status: status_filter,start_date: start_date, end_date: end_date, sort: sort, user_name: user_name}
}


function filterInit()
{
    //status checkbox init
    const checkboxes = $('.status input[type=checkbox]')
    checkboxes.each(function () {
        $(this).on("input", function () {
            const result = checkAll()
            paging(1, result.sort, result.status, result.start_date, result.end_date, result.user_name)
        })
    })

    //date range input init
    const date_range_inputs = $('.date-input')
    date_range_inputs.each(function () {
        $(this).attr('value', null)
        $(this).on("input", function () {
            const result = checkAll()
            paging(1, result.sort, result.status, result.start_date, result.end_date, result.user_name)
        })
    })

    //username input init
    const user_name_input = $('.user-name-input')
    user_name_input.attr('value', null)
    user_name_input.on("input", function () {
        const result = checkAll()
        paging(1, result.sort, result.status, result.start_date, result.end_date, result.user_name)
    })


    const select = $('select')
    select.on("input", function (){
        const result = checkAll()
        paging(1, result.sort, result.status, result.start_date, result.end_date, result.user_name)
    })
}

window.onload = function () {
    paging(1);
    filterInit()
}


