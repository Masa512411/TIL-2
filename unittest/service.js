function checkType(value) {
    var type = null;
    switch (typeof value) {
        case 'string' :
            type = 'string';
            break;
        default:
            type = 'monster';
            break;
    }
    return type;
}

function xhr(url, cb) {
    var xhr = new XMLHttpRequest();
    xhr.addEventListener('load', function() {
            cb(JSON.parse(this.responseText));
    });
    xhr.open('get', url);
    xhr.send();
}
