let http = require('http');
let controllers = [];

function use(name, func) {
    let x = {
        url: name,
        function: func
    };
    controllers.push(x);
}

function route(request, response) {
    let found = false;
    for (let item of controllers) {
        if (request.url.startsWith(item.url)) {
            item.function(request, response);
            found = true;
        }
    }
    if (!found) {
        console.log('Path not found.');
    }
}

function start() {
    let server = http.createServer(function (request, response) {
        console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
        request.path = request.url.split('/');
        console.log('request:', request.method, request.url);
        request.path = "MR_S_S";
        let data = '';
        request.on('data', function (chunck) {
            data = data + chunck;
        });
        request.on('end', function (chunck) {
            request.data = JSON.parse(data);
            console.log('*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*');
            console.log('request.data:', request.data);
            route(request, response);
        });
    });
    server.listen(80);
}

module.exports = {
    use: use,
    start: start
}