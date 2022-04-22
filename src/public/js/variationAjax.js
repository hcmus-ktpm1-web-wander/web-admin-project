function getCurrentLastRow() {
    return $(`#variation-table tbody`).children().length
}

function addVariation(productID, sizes = null, colors = null, stock = 0) {
    if (stock == null)
        stock = 0

    const table = $(`.table tbody`)
    const last_row = getCurrentLastRow() || 0

    table.append(`                                                    
                <tr>
                    <td>
                        <select class="size-select" aria-label="Default select example" id="size-select-${last_row}" 
                            style="border: 1px solid lightgray !important; border-radius: 5px" name="size">
                        </select>
                    </td>
                    <td>
                          <input type="color" class="form-control-color" name="color"
                          id="color-select-${last_row}">
                    </td>

                    <td>
                        <input type="number"
                        style="border: 1px solid lightgray !important; border-radius: 5px"
                        name="stock" value="${stock}" oninput="stockCheck(${last_row})">
                    </td>
                </tr>`)
    const size_buffer = ['S', 'M', 'L', 'XL', '2XL', '3XL']

    //set size default
    const size_select = $(`#size-select-${last_row}`)

    for (let i = 0; i < size_buffer.length; i++)
        size_select.append(`<option value="${size_buffer[i]}">${size_buffer[i]}</option>`)

    size_select.val(`${sizes}`)

    //set color
    const color_select = $(`#color-select-${last_row}`)
    for (let i = 0; i < color_select.length; i++)
        color_select.val(colors)
}


function stockCheck(row) {
    const positive_regex = '^[+]?\\d+([.]\\d+)?$';

    const value = $(`#variation-table input[name=stock-${row}]`).val()

    const isValid = value.match(positive_regex)

    const error = $(`#variation-table .stock-${row}`)

    let msg = ''

    if (isValid == null)
        msg = 'Please enter a positive number'

    error.text(msg)

    return msg
}

function loadCurrentData() {
    const productID = $("input[name=product-id]").val()

    console.log("id:", productID)

    const url = `/api/product/get?productID=${productID}`
    $.get(url, function (data) {
        const variations = data.product.variation
        if (variations) {
            variations.forEach(variation => {
                addVariation(productID, variation.size, variation.color, variation.stock)
            });
        }
    })
}

// function edit(productID) {

//     const table_body = $(`#variation-table tbody`).children() //tr
//     const data = []

//     for (let i = 0; i < table_body.length; i++) {
//         //stock check
//         const isValid = stockCheck(i)
//         if (isValid !== '') {
//             $(`.general-error`).text(isValid)
//             return false;
//         }

//         const size = $(`#size-select-${i}`).find(":selected").text();

//         const color = $(`#color-select-${i}`).val();

//         const stock = $(`input[name=stock-${i}`).val()

//         data.push({ size: size, color: color, stock: stock })
//     }

//     //img
//     const img = []
//     const temp = $(`#add-img div[class=col-3] img`)
//     temp.each(function () {
//         img.push($(this).attr("src"))
//     })

//     const name = $(`input[name=name]`).val()
//     const price = $(`input[name=price]`).val()
//     const category = $(`input[name=category]`).val()
//     const brand = $(`input[name=brand]`).val()
//     const SKU = $(`input[name=SKU]`).val()
//     const description = $(`input[name=description]`).val()
//     const detail_info = $(`input[name=detail_info]`).val()

//     const url = `/product/edit/${productID}`
//     fetch(url, {
//         method: "PUT",
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//             name: name,
//             price: price,
//             category: category,
//             brand: brand,
//             SKU: SKU,
//             description: description,
//             detail_info: detail_info,
//             productID: productID,
//             variation: data,
//             img: img
//         })
//     })
//     // window.location.href = `/product/edit/${productID}`
// }

window.onload = function () {
    // const edit_btn = $('#edit-product-btn')
    // edit_btn.on('click', function () {
    //     event.preventDefault()
    // })

    loadCurrentData()
}
