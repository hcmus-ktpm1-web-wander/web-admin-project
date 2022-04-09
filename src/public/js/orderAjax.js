function paging(page) {
    fetch('/api/order?page=' + page, {
        method: "GET"
    }).then(r => r.json()).then(data => {
        $('#order-body').html('');
        data.result.data.forEach(function (item, index) {
            const number = (index + 1) + (page-1) * 5;
            console.log(number);
            let str = `
            <tr>
                <td>
                    <div class="d-flex px-2 py-1">
                        <div>
                            <span class="text-secondary text-xs font-weight-bold">${item._id}</span>
                        </div>

                    </div>
                </td>
                <td>
                    <div class="d-flex flex-column justify-content-center">
                        <h6 class="mb-0 text-sm">${item.customer_name}</h6>
                    </div>
                </td>
                <td class="align-middle text-center">
                    <span class="text-secondary text-xs font-weight-bold">${item.create_date}</span>
                </td> `;

            if (item.status === 'Pending') {
                str += `<td class="align-middle text-center">
                        <span class="badge badge-sm bg-gradient-secondary w-70" style="border-width: 0;">${item.status}</span>
                    </td> `;
            } else if (item.status === 'Processing') {
                str += `<td class="align-middle text-center">
                        <span class="badge badge-sm bg-gradient-warning w-70" style="border-width: 0;">${item.status}</span>
                    </td> `;
            } else if (item.status === 'Completed') {
                str += `<td class="align-middle text-center">
                       <span class="badge badge-sm bg-gradient-success w-70" style="border-width: 0;">${item.status}</span>
                    </td> `;
            } else if (item.status === 'Canceled') {
                str += `<td class="align-middle text-center">
                        <span class="badge badge-sm bg-gradient-danger w-70" style="border-width: 0;">${item.status}</span>
                    </td>
                `;
            }

            str +=
                `<td class="align-middle text-center">
                    <span>${item.total}$</span>
                </td>
                <td class="align-middle text-center text-sm">
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
                                <h6 class="mb-2"><b>ID: ${item._id}</b></h6>
                                <div class="mb-1"><b>Customer name:</b> ${item.customer_name}</div>
                                <div class="mb-1"><b>Customer ID:</b> ${item.customer_id}</div>
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

            str +=
                `</div>
                    <div class="row">
                        <h6 class="col">Total:</h6>
                        <div class="col-3">
                            <h6 class="text-secondary font-weight-bold">
                                ${item.total}$</h6>
                        </div>
                    </div>
                </div>
                </div>
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
    });
}

window.onload = function () {
    paging(1);
}