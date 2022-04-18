function getProductsByFilter(page, category = null, brand = null, min_price = '0', max_price = '999999') {
    const sort_type = $('#sort-dropdown').find(":selected").val();
    if (min_price == '')
        min_price = '0'
    if (max_price == '')
        max_price = '999999'


    if (category == null || category.length == 0)
        category = null
    if (brand == null || brand.length == 0)
        brand = null

    fetch(`/api/product?sort=${sort_type}&page=${page}&category=${JSON.stringify(category)}&brand=${JSON.stringify(brand)}&min=${min_price}&max=${max_price}`, {
        method: "GET"
    }).then(r => r.json()).then(data => {

        category = JSON.stringify(category)
        brand = JSON.stringify(brand)

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
        /*onClick="getProductsByFilter(${data.result.prev},${category}, ${brand}, ${min_price}, ${max_price})"*/
        $('#product-pagination').html(
            `<li class="page-item" style="${data.result.disablePrev} ">
                <button class="page-link" onClick='getProductsByFilter(${data.result.prev},${category},${brand},${min_price}, ${max_price})' aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>

            <li class="page-item ${data.result.hiddenPrev}"
                style="${data.result.disablePrev} ${data.result.numberPrev}">
                <button class="page-link"  onClick='getProductsByFilter(${data.result.prev},${category},${brand},${min_price}, ${max_price})'> ${data.result.prev} </button>
            </li>
            
            <li class="page-item active">
                <button class="page-link" onClick='getProductsByFilter(${data.result.page},${category},${brand},${min_price}, ${max_price})'> ${data.result.page} </button>
            </li>
            <li class="page-item ${data.result.hiddenNext}"
                style="${data.result.disableNext} ${data.result.numberNext}">
                <button class="page-link" onClick='getProductsByFilter(${data.result.next},${category},${brand},${min_price}, ${max_price})'> ${data.result.next} </button>
            </li>
            
            <li class="page-item" style="${data.result.disableNext}">
                <button class="page-link" onClick='getProductsByFilter(${data.result.next},${category},${brand},${min_price}, ${max_price})' aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>`);
    });
}

function test(field) {
    console.log(field)

}


function checkAll() {
    let category_filter = []
    let brand_filter = []
    let min_price = 0;
    let max_price = 0;

    const size_check_boxes = $('.categories input[type=checkbox]')
    size_check_boxes.each(function () {
        const id = $(this).attr('id')
        if ($(this).is(':checked'))
            category_filter.push(id)
    })

    const brand_size_checkboxes = $('.brand input[type=checkbox]')
    brand_size_checkboxes.each(function () {
        const id = $(this).attr('id')
        if ($(this).is(':checked'))
            brand_filter.push(id)
    })

    const price_inputs = $('.price input[type=number]')
    price_inputs.each(function () {
        const name = $(this).attr('name')
        const value = $(this).val()
        if (name == 'min-price')
            min_price = value
        else
            max_price = value
    })

    return { category: category_filter, brand: brand_filter, min_price: min_price, max_price: max_price }
}

function Init() {
    const checkboxes = $('input[type=checkbox]')
    checkboxes.each(function () {
        $(this).on("input", function () {
            const result = checkAll()
            getProductsByFilter(1, result.category, result.brand, result.min_price, result.max_price)

        })
    })

    const price_inputs = $('.price input[type=number]')
    price_inputs.each(function () {
        const name = $(this).attr('name')
        if (name == 'min-price')
            $(this).attr('value', '0')
        else
            $(this).attr('value', '999999')

        $(this).on("input", function () {
            const result = checkAll()
            getProductsByFilter(1, result.category, result.brand, result.min_price, result.max_price)
        })
    })

    const select = $('#sort-dropdown')
    select.on("input", function () {
        const result = checkAll()
        getProductsByFilter(1, result.category, result.brand, result.min_price, result.max_price)
    })
}


window.onload = function () {
    const category = ['Bags', 'Accessories']
    getProductsByFilter(1)
    Init()
}

// var numberadd = {{ color.length }} || 0;
// var div_add_color = document.getElementById('add-color');
// const add_div = "<div id='color-" + numberadd + "-wrap' class='position-relative mx-1 mb-2'> <input type='color' class='form-control-color' name='color' id=\"color-" + numberadd + "\"> <a id=\"color-" + numberadd + "-minus\"  onmousedown='removeColor(\"color-" + numberadd + "\")'> <i class='fa fa-minus-circle position-absolute' style=' z-index: 1; right:-5px; top:-4px;' aria-hidden='true'> </i > </a > </div >";

// function addColor() {
//     const _id = 'color-' + numberadd;
//     const _id_minus = _id + '-minus';
//     console.log("add color");

//     div_add_color.innerHTML += add_div;

//     numberadd++;
// }

// function removeColor(id) {
//     console.log("remove", id)
//     document.getElementById(id).remove();
//     document.getElementById(id + '-minus').remove();
//     document.getElementById(id + '-wrap').remove();
// }