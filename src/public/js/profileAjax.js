function getInfo() {

    console.log('-- Ajax edit info --');

    const url = "/api/profile/info";
    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(data => {

        console.log("data: ", data);
        const $showInfo = $('#show-info');

        const $btnEdit = $('#edit-info-btn');

        if ($btnEdit.attr("value") === "true") {
            $btnEdit.val("false");

            var info = `
            <p class="text-sm">
                ${data.intro}
            </p>
            <hr class="horizontal gray-light mt-2">
            <ul class="list-group">
                <li class="list-group-item border-0 ps-0  text-sm"><strong class="text-dark">Full
                        Name:</strong>
                    &nbsp;
                    ${data.fullname}
                </li>
                <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">User
                        Name:</strong>
                    &nbsp;
                    ${data.username}
                </li>
                <li class="list-group-item border-0 ps-0  text-sm"><strong
                        class="text-dark">Mobile:</strong>
                    &nbsp;
                    ${data.phone}
                </li>
                <li class="list-group-item border-0 ps-0  text-sm"><strong class="text-dark">Email:</strong>
                    &nbsp;
                    ${data.email}
                </li>
                <li class="list-group-item border-0 ps-0 text-sm"><strong
                        class="text-dark">Location:</strong>
                    &nbsp;
                    ${data.address}
                </li>
                <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Employed
                        :</strong>
                    &nbsp; ${data.employed}
                </li>
            </ul>`;

            $showInfo.html(info);
        } else {
            $btnEdit.val("true");

            var form = `
                <textarea class="form-control" name="intro" id="edit_intro"
                    rows="4">${data.intro}</textarea>

                <hr class="horizontal gray-light mt-2">
                <ul class="list-group">
                    <li class="list-group-item border-0 ps-0  text-sm"><strong class="text-dark">Full
                            Name:</strong>
                        &nbsp;
                        <input type="text" class="form-control" id="edit_fullname"
                            placeholder="${data.fullname}" name="edit_fullname"
                            value="${data.fullname}">

                    </li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">User
                            Name:</strong>
                        &nbsp;
                        <input type="text" class="form-control" id="edit_username"
                            placeholder="${data.username}" name="edit_username"
                            value="${data.username}">
                    </li>
                    <li class="list-group-item border-0 ps-0  text-sm"><strong
                            class="text-dark">Mobile:</strong>
                        &nbsp;
                        <input type="tel" class="form-control" id="edit_phone" placeholder="${data.phone}"
                            value="${data.phone}" name="edit_phone">
                    </li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong
                            class="text-dark">Location:</strong>
                        &nbsp;
                        <input type="text" class="form-control" id="edit_addr" placeholder="${data.address}"
                            value="${data.address}}" name="edit_addr">
                    </li>
                     <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Email:</strong>
                        &nbsp; ${data.email}
                    </li>
                    <li class="list-group-item border-0 ps-0 text-sm"><strong class="text-dark">Employed
                            :</strong>
                        &nbsp; ${data.employed}
                    </li>
                    <li>
                        <div class="w-100 d-flex flex-row justify-content-end ">
                            <button type="submit" class="btn btn-secondary me-2" form="form_edit_false">Cancle
                            </button>
                            <button type="submit" class="btn btn-primary"
                                onclick="editInfo()">Submit
                            </button>

                        </div>
                    </li>
                </ul>
                `;

            $showInfo.html(form);

        }
        $('#img-avatar').attr('src', data.avatar_url);
        $('#avt-fullname').html(data.fullname);
        $('#avt-role').html(data.role);
    });
}

function editInfo() {
    console.log('-- Ajax edit info --');

    const url = "/api/profile/edit-info";
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            intro: $('#edit_intro').val(),
            edit_fullname: $('#edit_fullname').val(),
            edit_username: $(`#edit_username`).val(),
            edit_phone: $(`#edit_phone`).val(),
            edit_addr: $(`#edit_addr`).val()
        })
    })

    $('#edit-info-btn').val("true");

    getInfo();
}
