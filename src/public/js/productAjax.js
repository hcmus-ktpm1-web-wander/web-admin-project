function getProductsByFilter(page, category=null, brand=null, min_price=null, max_price=null) {
    const sort_type = $('#sort-dropdown').find(":selected").val();
    if (!category || category.length == 0)
        category=null
    if (!brand || brand.length == 0)
        brand=null
    fetch(`/api/product?sort=${sort_type}&page=${page}&category=${JSON.stringify(category)}&brand=${JSON.stringify(brand)}&min=${min_price}min_price&max=$${max_price}`, {
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
                <button class="page-link" onClick="getProductsBySort('${data.result.prev}')" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
    
            <li class="page-item ${data.result.hiddenPrev}"
                style="${data.result.disablePrev} ${data.result.numberPrev}">
                <button class="page-link"  onClick="getProductsBySort('${data.result.prev}')"> ${data.result.prev} </button>
            </li>
    
            <li class="page-item active">
                <button class="page-link" onClick="getProductsBySort('${data.result.page}')"> ${data.result.page} </button>
            </li>
            <li class="page-item ${data.result.hiddenNext}"
                style="${data.result.disableNext} ${data.result.numberNext}">
                <button class="page-link" onClick="getProductsBySort('${data.result.next}')"> ${data.result.next} </button>
            </li>
            
            <li class="page-item" style="${data.result.disableNext}">
                <button class="page-link" onClick="getProductsBySort('${data.result.next}')" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>`);
    });
}


function checkAll()
{
    let category_filter = []
    let brand_filter = []
    let min_price = 0;
    let max_price = 0;

    const size_check_boxes = $('.categories input[type=checkbox]')
    size_check_boxes.each(function (){
        const id = $(this).attr('id')
        if($(this).is(':checked'))
            category_filter.push(id)
    })

    const brand_size_checkboxes = $('.brand input[type=checkbox]')
    brand_size_checkboxes.each(function (){
        const id = $(this).attr('id')
        if($(this).is(':checked'))
            brand_filter.push(id)
    })

    const price_inputs = $('.price input[type=number]')
    price_inputs.each(function (){
        const name = $(this).attr('name')
        if (name=='min-price')
            min_price=$(this).val()
        else
            max_price=$(this).val()
    })

    return {category: category_filter, brand: brand_filter, min_price: min_price, max_price: max_price}
}

function Init()
{

    const filter_form = $('#collapseOne')
    const expand_btn = $('a')
    expand_btn.on('click', function (){
        if (filter_form.attr('class') == 'collapse')
        {
            filter_form.attr('class','collapsing')
            setTimeout(function (){
                filter_form.attr('class','collapse show')
            },60)
        }
        else
        {
            filter_form.attr('class','collapsing')
            setTimeout(function (){
                filter_form.attr('class','collapse')
            },60)
        }

    })

    const checkboxes = $('input[type=checkbox]')
    checkboxes.each(function (){
        $(this).on("input", function (){
            const result=checkAll()
            getProductsByFilter(1,result.category,result.brand)

        })
    })

    const price_inputs = $('.price input[type=number]')
    price_inputs.each(function (){

        $(this).on("input", function (){
            const result=checkAll()
            getProductsByFilter(1,result.category,result.brand)
        })
    })


}


window.onload = function () {
    getProductsByFilter(1)
    Init()
}

