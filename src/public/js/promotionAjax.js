function loadPromotion(page) {
    fetch('/api/auth/promotion?page=' + page, {
        method: "GET"
    }).then(r => r.json()).then(data => {
        $('#promotion-body').html('');
        data.data.forEach(function (item, index) {
            let start_date = item.start_date.substring(0, item.start_date.indexOf("T"))
            let end_date = item.end_date.substring(0, item.end_date.indexOf("T"))
            $('#promotion-body').append(
                `<tr>
                    <td>
                        <div class="d-flex px-2 py-1">
                            <div class="d-flex flex-column justify-content-center">
                                <h6 class="mb-0 text-sm" id="code-cell-${index}">${item.code}</h6>
                            </div>
                        </div>
                    </td>
                    <td>
                        <p class="text-xs font-weight-bold mb-0" id="level-cell-${index}">${item.level}</p>
                    </td>
                    <td class="align-middle text-center">
                        <span class="text-secondary text-xs font-weight-bold" id="slot-cell-${index}">${item.slot}</span>
                    </td>
                    <td class="align-middle text-center">
                        <p class="text-xs font-weight-bold mb-0" id="date-cell-${index}">${start_date} - ${end_date}</p>
                    </td>
                    <td class="align-middle text-center text-sm">
                        <svg onclick="openEditModal(${index})" data-bs-toggle="modal" data-bs-target='#promotion-edit' width="20px" height="20px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                            viewBox="0 0 423.278 423.278" style="enable-background:new 0 0 423.278 423.278;" xml:space="preserve">
                            <g>
                                <g>
                                    <path style="fill:none;" d="M186.95,343.077l-39.367,11.362h146.668c6.629,0,12,5.373,12,12c0,6.627-5.371,12-12,12H66.541
                                        c-0.643,0-1.268-0.065-1.883-0.163c-0.643,0.105-1.287,0.163-1.928,0.163c-2.998,0-5.932-1.124-8.184-3.222
                                        c-3.086-2.877-4.435-7.163-3.553-11.288l27.934-130.598c0.484-2.264,1.613-4.339,3.25-5.976L228.255,81.277H26.412v318.001
                                        h318.001v-211.55L192.108,340.033C190.673,341.467,188.899,342.514,186.95,343.077z"/>
                                    <polygon style="fill:none;" points="163.321,324.917 97.879,259.474 78.654,349.352 		"/>
                                    <path style="fill:none;" d="M327.089,24c-4.922,0-8.928,1.6-12.604,5.035c-0.145,0.137-0.293,0.268-0.443,0.395l-8.666,8.666
                                        l77.363,77.362l8.471-8.47c0.041-0.042,0.084-0.082,0.125-0.123l0.086-0.085c0.123-0.145,0.25-0.288,0.381-0.428
                                        c16.182-17.318-11.684-47.783-20.609-56.707C354.897,33.346,338.821,24,327.089,24z"/>
                                    <path style="fill:#73D0F4;" d="M107.91,235.564l77.362,77.362l180.496-180.498l-77.363-77.363L107.91,235.564z M309.38,111.454
                                        c4.686,4.686,4.686,12.284,0,16.97L182.606,255.197c-2.344,2.342-5.414,3.514-8.486,3.514c-3.07,0-6.141-1.171-8.484-3.514
                                        c-4.686-4.687-4.686-12.285,0-16.971l126.773-126.772C297.095,106.768,304.694,106.768,309.38,111.454z"/>
                                    <path style="fill:#3D6889;" d="M165.636,255.197c2.344,2.343,5.414,3.514,8.484,3.514c3.072,0,6.142-1.172,8.486-3.514
                                        L309.38,128.424c4.686-4.687,4.686-12.285,0-16.97c-4.685-4.686-12.285-4.686-16.971,0L165.636,238.226
                                        C160.95,242.913,160.95,250.51,165.636,255.197z"/>
                                    <path style="fill:#3D6889;" d="M417.848,76.476c-4.635-13.872-14.898-29.019-29.686-43.803C373.259,17.768,350.565,0,327.089,0
                                        c-10.531,0-20.234,3.703-28.135,10.721c-0.412,0.316-0.805,0.661-1.176,1.032l-45.525,45.524H14.412c-6.627,0-12,5.373-12,12
                                        v342.001c0,6.627,5.373,12,12,12h342.001c6.627,0,12-5.373,12-12V166.123c0-0.748-0.078-1.476-0.209-2.186l39.853-39.854
                                        c0.08-0.079,0.16-0.157,0.238-0.237c0.002-0.001,0.004-0.003,0.006-0.005l0.781-0.782c0.369-0.369,0.707-0.754,1.017-1.157
                                        C421.012,109.661,423.694,93.979,417.848,76.476z M163.321,324.917l-84.667,24.436l19.225-89.878L163.321,324.917z
                                        M185.272,312.926l-77.362-77.362L288.405,55.066l77.363,77.363L185.272,312.926z M344.413,399.278H26.412V81.277h201.843
                                        L82.178,227.355c-1.637,1.637-2.766,3.712-3.25,5.976L50.994,363.928c-0.883,4.125,0.467,8.411,3.553,11.288
                                        c2.252,2.098,5.186,3.222,8.184,3.222c0.641,0,231.52,0,231.52,0c6.629,0,12-5.373,12-12c0-6.627-5.371-12-12-12H147.583
                                        l39.367-11.362c1.949-0.563,3.723-1.61,5.158-3.044l152.305-152.305V399.278z M391.802,106.351
                                        c-0.131,0.14-0.258,0.283-0.381,0.428l-0.086,0.085c-0.041,0.041-0.084,0.082-0.125,0.123l-8.471,8.47l-77.363-77.362l8.666-8.666
                                        c0.15-0.127,0.299-0.258,0.443-0.395C318.161,25.6,322.167,24,327.089,24c11.732,0,27.809,9.346,44.103,25.644
                                        C380.118,58.568,407.983,89.033,391.802,106.351z"/>
                                </g>
                            </g>
                        </svg>                  
                        <svg id="Layer_1" width="20px" height="20px" fill="#FF0000" data-bs-toggle="modal" data-bs-target='#promotion-delete-${index}' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 105.16 122.88"><defs><style>.cls-1{fill-rule:evenodd;}</style></defs><title>delete</title><path class="cls-1" d="M11.17,37.16H94.65a8.4,8.4,0,0,1,2,.16,5.93,5.93,0,0,1,2.88,1.56,5.43,5.43,0,0,1,1.64,3.34,7.65,7.65,0,0,1-.06,1.44L94,117.31v0l0,.13,0,.28v0a7.06,7.06,0,0,1-.2.9v0l0,.06v0a5.89,5.89,0,0,1-5.47,4.07H17.32a6.17,6.17,0,0,1-1.25-.19,6.17,6.17,0,0,1-1.16-.48h0a6.18,6.18,0,0,1-3.08-4.88l-7-73.49a7.69,7.69,0,0,1-.06-1.66,5.37,5.37,0,0,1,1.63-3.29,6,6,0,0,1,3-1.58,8.94,8.94,0,0,1,1.79-.13ZM5.65,8.8H37.12V6h0a2.44,2.44,0,0,1,0-.27,6,6,0,0,1,1.76-4h0A6,6,0,0,1,43.09,0H62.46l.3,0a6,6,0,0,1,5.7,6V6h0V8.8h32l.39,0a4.7,4.7,0,0,1,4.31,4.43c0,.18,0,.32,0,.5v9.86a2.59,2.59,0,0,1-2.59,2.59H2.59A2.59,2.59,0,0,1,0,23.62V13.53H0a1.56,1.56,0,0,1,0-.31v0A4.72,4.72,0,0,1,3.88,8.88,10.4,10.4,0,0,1,5.65,8.8Zm42.1,52.7a4.77,4.77,0,0,1,9.49,0v37a4.77,4.77,0,0,1-9.49,0v-37Zm23.73-.2a4.58,4.58,0,0,1,5-4.06,4.47,4.47,0,0,1,4.51,4.46l-2,37a4.57,4.57,0,0,1-5,4.06,4.47,4.47,0,0,1-4.51-4.46l2-37ZM25,61.7a4.46,4.46,0,0,1,4.5-4.46,4.58,4.58,0,0,1,5,4.06l2,37a4.47,4.47,0,0,1-4.51,4.46,4.57,4.57,0,0,1-5-4.06l-2-37Z"/></svg>
                    </td>
                               
                </tr>`
            )
        })
        $('#promotion-body').append(`
                    <!-- Delete Modal -->
                    <td>
                        <form id ="delete-form" action = '/manage/promotion/delete' method="post">
                            <div class="modal fade" tabIndex="-1"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <h5 class="modal-title" id="exampleModalLabel">Are you sure?
                                            </h5>
                                        </div>
                                        <div class="modal-footer"  style="height:70px">
                                            <input type="hidden" name="delete_code">
                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No
                                            </button>
                                            <button type="submit" class="btn btn-primary" style="background-color: red" data-bs-dismiss="modal">Yes
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </td>
                    
                    <!-- Edit Modal -->
                    <td>
                        <form id = "edit-form" action = '/manage/promotion/edit' method="post">
                            <div class="modal fade" id='promotion-edit' tabIndex="-1"
                                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit</h5>
                            </div>

                            <div class="modal-body">
                                <b>Code:</b> <span class="red-start">*</span>
                                <input type="text" class="form-control"  aria-label="Code" name="code" oninput="editCheck('code')" onblur="editCheck('code')">
                                <h6 class="code error"></h6>
    
                                <b>Level:</b> <span class="red-start">*</span>
                                <input type="text" class="form-control"  aria-label="Level" name="level" oninput="editCheck('level')" onblur="editCheck('level')">
                                <h6 class="level error"></h6>
    
                                <b>Slot:</b> <span class="red-start">*</span>
                                <input type="text" class="form-control"  aria-label="Slot" name="slot" oninput="editCheck('slot')" onblur="editCheck('slot')">
                                <h6 class="slot error"></h6>
    
                                <b>Duration:</b> <span class="red-start">*</span>
                                <div class="input-group input-group-sm mb-2">
                                    <input type="date" id="start_date" name="start_date" class="form-control" style="padding-right: 5px" oninput="editCheck('start_date')" onblur="editCheck('start_date')">
                                    <input type="date" id="end_date" name="end_date" class="form-control" style="padding-left: 5px" oninput="editCheck('end_date')" onblur="editCheck('end_date')">
                                </div>
                                <h6 class="start_date error"></h6>
                                <h6 class="end_date error"></h6>
    
                                <div class="modal-footer">
                                     <h6 class="general-error"></h6>
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel
                                    </button>
                                   <input type="hidden" name="edit_code">
                                    <button type="submit" class="btn btn-primary">Edit
                                    </button>
                                </div>
                            </div>
                        </div>
                                </div>
                            </div>
                        </form>
                    </td>`)

        $('#promotion-pagination').html(
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

window.onload = function () {
    loadPromotion(1)
    Init()
}

function isValid(input, field) {
    const regex = /[0-9]/g;
    const valid = input.match(regex)

    switch (field) {
        case 'code':
            if (input == "")
                return 'Code is required'
            break;

        case 'level':
            if (input == "")
                return 'Level is required'
            if (!valid || input.match(regex).length < input.length)
                return 'Please enter only digits'
            break;

        case 'slot':
            if (input == "")
                return 'Slot is required'
            if (!valid || input.match(regex).length < input.length)
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

function Init() {
    const inputs = $(`#add-form input`)

    inputs.each(function () {
        const name = $(this).attr("name")

        $(this).on("input", function () {
            const input = $(this).val()
            const error_msg = isValid(input, name)
            $(`#add-form .${name}`).text(error_msg)
        })

        $(this).blur(function () {
            const input = $(this).val()
            const error_msg = isValid(input, name)
            $(`#add-form .${name}`).text(error_msg)
        })
    })
    const submit = $(`#add-form .modal-footer button[type=submit]`)
    submit.on('click', function (){
        inputs.each(function (){
            const error_msg = isValid($(this).val(), $(this).attr("name"))
            if (error_msg != '')
            {
                event.preventDefault()
                $('#add-form .general-error').text(error_msg)
                return false
            }
            else
                submit.submit()

        })
    })
}

function openAddModal()
{
    //clear errors if exist
    const errors = $(`#add-form .error`)
    errors.each(function ()
    {
        errors.text('')
    })

    //init
    const inputs = $(`#add-form input`)
    inputs.each(function (){
        inputs.val('')
    })

}

function openEditModal(index)
{
    //clear errors if exist
    const error = $(`#edit-form .error`)
    error.each(function ()
    {
        error.text('')
    })

    //set default val
    const inputs = $(`#edit-form input`)
    inputs.each(function (){
        const field = $(this).attr("name")
        const current_text = $(`#${field}-cell-${index}`).text()

        $(this).val(current_text)
    })

    //set up hidden value
    const input_hidden = $(`#edit-form input[name=edit_code]`)
    const current_code_val  = $(`#code-cell-${index}`).text()
    input_hidden.val(current_code_val)

    // prevent editing when there are still input errors
    const edit_btn = $('#edit-form button[type=submit]')
    edit_btn.on('click', function (){
        inputs.each(function (){
            const error_msg = isValid($(this).val(), $(this).attr("name"))
            if (error_msg != '')
            {
                event.preventDefault()
                $('#edit-form .general-error').text(error_msg)
                return false
            }
            else
                edit_btn.submit()

        })
    })


}

function editCheck(field)
{
    const input = $(`#edit-form input[name=${field}]`)

    const msg = isValid(input.val(), field)

    const error = $(`#edit-form .${field}`)
    error.text(msg)
}




