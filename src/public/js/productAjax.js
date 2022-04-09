function paging(page) {

    fetch('/api/product?page=' + page, {
        method: "GET"
    }).then(r => r.json()).then(data => {
        $('#list-product-render').html('');
        data.result.data.forEach(function (item, index) {
            $('#list-product-render').append(`
           <div class="card mx-2 my-2" style="width: 18rem;">
						<div class="card-img">
							<img src="${item.thumbnail}" class="card-img-top" alt="thumbnail">
						</div>
						<div class="card-body">
							<h6 class="card-title">${item.name}</h6>
							<div class="card-text mb-3 text-sm">Price: <b>${item.price}$</b></div>
							<a href="/product/${item._id}" class="btn btn-primary" style="z-index: 1;">Detail</a>
						</div>
					</div>`);
        });

        $('#product-pagination').html(
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