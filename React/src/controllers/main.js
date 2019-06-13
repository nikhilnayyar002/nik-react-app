
function postData(url = '', data = {}) {
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
        .then(response => response.json()); // parses JSON response into native Javascript objects 
}
function getData(url = '') {
    // Default options are marked with *
    return fetch(url, {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            "Authorization": "Bearer " + localStorage.getItem('token')
        }
    })
        .then(response => response.json()); // parses JSON response into native Javascript objects 
}

function isUserPayloadValid() {
    let token = localStorage.getItem('token');
    if (token) {
        var userPayload = atob(token.split('.')[1]);
        userPayload=JSON.parse(userPayload);
        if (userPayload && (userPayload.exp > Date.now() / 1000))
        return true;
    }
    return false;
}

export {getData, postData, isUserPayloadValid}