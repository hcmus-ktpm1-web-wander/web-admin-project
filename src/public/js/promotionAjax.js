function loadPromotion(page) {
    fetch('/api/auth/promotion?page=' + page, {
        method: "GET"
    }).then(r => r.json()).then(data => {
        $('#promotion-body').html('');
        data.data.forEach(function (item, index) {
            let start_date = item.start_date.substring(0,item.start_date.indexOf("T"))
            let end_date = item.end_date.substring(0,item.end_date.indexOf("T"))
            $('#promotion-body').append(
                `<tr>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm">${item.code}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0">${item.level}</p>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold">${item.slot}</span>
                    </td>
                    <td class="align-middle text-center">
                        <p class="text-xs font-weight-bold mb-0">${start_date} - ${end_date}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <button class="button-add btn-view badge badge-sm bg-gradient-secondary"
                                data-bs-toggle="modal" data-bs-target='#promotion${index}'>View
                        </button>
                    </td>
                    <!-- User Modal -->
                    <td>
                        <div class="modal fade" id='promotion${index}' tabIndex="-1"
                             aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <h5 class="modal-title" id="exampleModalLabel">Promotion
                                            information
                                        </h5>
    
                                    </div>
                                    <div class="modal-body">
                                        <div><b>Code:</b> ${item.code}</div>
                                        <div><b>Level:</b> ${item.level}</div>
                                        <div><b>Slot:</b> ${item.slot}</div>
                                        <div><b>Duration:</b> ${start_date} - ${end_date}</div>
                                    </div>
                                    <div class="modal-footer"  style="height:70px">
                                        <button type="button" class="btn btn-secondary"
                                                data-bs-dismiss="modal">Close
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>`
            )
        })

        $('promotion-pagination').html(
            `<li class="page-item" style="${data.disablePrev} ">
                <button class="page-link" onClick="loadPromotion('${data.prev}')" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </button>
            </li>
    
            <li class="page-item ${data.hiddenPrev}"
                style="${data.disablePrev} ${data.numberPrev}">
                <button class="page-link"  onClick="loadPromotion('${data.prev}')"> ${data.prev} </button>
            </li>
    
            <li class="page-item active">
                <button class="page-link" onClick="loadPromotion('${data.page}')"> ${data.page} </button>
            </li>
            <li class="page-item ${data.hiddenNext}"
                style="${data.disableNext} ${data.numberNext}">
                <button class="page-link" onClick="loadPromotion('${data.next}')"> ${data.next} </button>
            </li>
            
            <li class="page-item" style="${data.disableNext}">
                <button class="page-link" onClick="loadPromotion('${data.next}')" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </button>
            </li>`);
    })
}

window.onload = function ()
{
    loadPromotion(1)
    inputInit()
}

function isValidInput(input,field)
{
    const regex = /[0-9]/g;
    const valid=input.match(regex)

    switch (field)
    {
        case 'code':
            if (input == "")
                return 'Code is required'
            break;

        case 'level':
            if (input == "")
                return 'Level is required'
            if(!valid ||input.match(regex).length < input.length)
                return 'Please enter only digits'
            break;

        case 'slot':
            if (input == "")
                return 'Slot is required'
            if(!valid ||input.match(regex).length < input.length)
                return 'Please enter only digits'
            break;

        case 'start_date':
            if (!input)
                return 'Start date is required'
            break;

        case 'end_date':
            if (!input)
                return 'End date is required'
            break;
    }
    return ''
}

function inputInit()
{
    const inputs = $(`div[class=modal-body] input`)
    inputs.each(function ()
    {
        const name = $(this).attr("name")

        $(this).on("input", function (){
            const input = $(this).val()
            const error_msg = isValidInput(input,name)
            $(`.${name}`).text(error_msg)
        })

        $(this).blur(function (){
            const input = $(this).val()
            const error_msg = isValidInput(input,name)
            $(`.${name}`).text(error_msg)
        })
    })

}