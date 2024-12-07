let http = require('http');
let controllers = [];

function write(response, body) {
    response.write(JSON.stringify(body));
    response.end();
}

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
        }
        found = true;
    }
    if (!found) {
        console.log('Path Not Found.');
    }
}

function start() {
    let server = http.createServer(function (request, response) {
        console.log('');
        console.log('__________________________________');
        console.log('');
        request.path = request.url.split('/');
        route(request, response);
    });
    server.listen(80);
}

module.exports = {
    use: use,
    start: start,
    write: write
}