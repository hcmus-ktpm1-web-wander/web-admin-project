window.onload = getOrders();


function getOrders() {
    console.log('-- Ajax get orders --');

    const url = "/api/order";
    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(r => r.json()).then(data => {

        console.log("data: ", data);


    });

}

