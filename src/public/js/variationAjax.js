function getCurrentLastRow()
{
    return $(`.variation-table tbody`).children().length
}

function addVariation(productID, sizes = null, colors = null, price = 0,stock = 0)
{
    if (price == null)
        price = 0
    if (stock == null)
        stock =0

    const table = $(`.variation-table tbody`)
    const last_row =  getCurrentLastRow() || 0

    table.append(`                                                    
                <tr>
                    <td>
                        <select class="size-select" aria-label="Default select example" id="size-select-${last_row}" onclick="loadSizeDropdown('${last_row}')"
                            style="border: 1px solid gray !important; border-radius: 10px">
                        </select>
                    </td>
                    <td>
                        <select class="color-select" aria-label="Default select example" id="color-select-${last_row}" onclick="loadColorDropdown('${last_row}')"
                            style="border: 1px solid gray !important; border-radius: 10px">
                        </select>
                    </td>
                    <td>
                        <input type="number" name="price-${last_row}" value="${price}">
                    </td>
                    <td>
                        <input type="number" name="stock-${last_row}" value="${stock}">
                    </td>
                </tr>`)

    if(sizes)
    {
        const size_select = $(`#size-select-${last_row}`)
        sizes.forEach(size=> {
            size_select.prepend(`<option value="${size}">${size}</option>`)
        });
        $(`#size-select-${last_row}`).val(`${sizes[0]}`)
    }

    if (colors)
    {
        const color_select = $(`#color-select-${last_row}`)
        colors.forEach(color=> {
            color_select.prepend(`<option value="${color}">${color}</option>`)
        });
        $(`#color-select-${last_row}`).val(`${colors[0]}`)
    }
}

function loadSizeDropdown(index)
{
    const productID = $(`input[name=product-id]`).val()
    const url = `/api/product/get?productID=${productID}`

    $.get(url, function (data){
        const sizes = data.product.size
        const colors = data.product.color
        const current_size = $(`#size-select-${index}`).find(":selected").text();

        //variation
        /*const table_body = $(`.variation-table tbody`).children() //tr*/

 /*       const remainSize = sizes.slice()

        sizes.forEach(size => {
             let count = 0
             for (let i = 0; i < table_body.length; i++)
                 if(size == $(`#size-select-${i}`).find(":selected").text())
                     count+=1
             if (count == colors.length)
                 remainSize.splice(sizes.indexOf(size),1)
         });


        if(current_size != '')
        {
            remainSize.splice(sizes.indexOf(current_size),1)
            remainSize.splice(0, 0, current_size);
        }*/

        const select = $(`#size-select-${index}`)
        select.empty()

        sizes.forEach(size=> {
            select.append(`<option value="${size}">${size}</option>`)
        });
        select.val(`${current_size}`)
    })
    console.log($(`#size-select-${index}`).find(":selected").text())
}

function loadColorDropdown(index)
{
    const productID = $(`input[name=product-id]`).val()
    const url = `/api/product/get?productID=${productID}`
    $.get(url, function (data){
        const variations = data.product.variation
        const colors = data.product.color
        const sizes = data.product.size
        const current_color = $(`#color-select-${index}`).find(":selected").text();

       /* //variation
        const table_body = $(`.variation-table tbody`).children() //tr
        const remainColor = colors.slice()


        const current_size = $(`#size-select-${index}`).find(":selected").text()

        colors.forEach(color => {
            for (let i = 0; i < table_body.length; i++)
            {
                if(current_size== $(`#size-select-${i}`).find(":selected").text() && color == $(`#color-select-${i}`).find(":selected").text())
                    remainColor.splice(colors.indexOf(color),1)
            }
        });

        if(current_color!='')
        {
            remainColor.splice(colors.indexOf(current_color),1)
            remainColor.splice(0, 0, current_color);
        }*/

        const select = $(`#color-select-${index}`)
        select.empty()

        colors.forEach(color=> {
            select.append(`<option value="${color}">${color}</option>`)
        });
        select.val(`${current_color}`)
    })

}

function edit(productID)
{
    //variation
    const table_body = $(`.variation-table tbody`).children() //tr
    const data = []
    for (let i = 0; i < table_body.length; i++)
    {
        const size = $(`#size-select-${i}`).find(":selected").text();

        const color = $(`#color-select-${i}`).find(":selected").text();

        const price = $(`input[name=price-${i}`).val()

        const stock = $(`input[name=stock-${i}`).val()

        data.push({size: size, color: color, price: price, stock: stock})
    }

    //img
    const img = []
    const temp = $(`#add-img div[class=col-3] img`)
    temp.each(function (){
        img.push($(this).attr("src"))
    })

    //name
    const name = $(`input[name=name]`).val()

    //price
    const price = $(`input[name=price]`).val()

    //price
    const brand = $(`input[name=brand]`).val()

    const url = `/product/edit`
        $.post(url,{productID: productID, variation: JSON.stringify(data), img: JSON.stringify(img)}, function (data) {
    })
}

function loadCurrentData()
{
    const productID = $(`input[name=product-id]`).val()
    const url = `/api/product/get?productID=${productID}`
    $.get(url,function (data) {
        const variations = data.product.variation
        if(variations)
        {
            variations.forEach(variation => {
                addVariation(productID, [variation.size], [variation.color],variation.price,variation.stock)
            });
        }
    })
    
}

window.onload = function () {
    const edit_btn = $('#edit-product-btn')
    edit_btn.on('click', function (){
        event.preventDefault()
    })

    loadCurrentData()
}
