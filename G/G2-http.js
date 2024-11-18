let http = require('http');
let controllers = [];


function write(res, body) {
    res.write(JSON.stringify(body));
    res.end();
}

function use(method, name, func) {
    let x = {
        method: method,
        url: name,
        function: func,
    };
    controllers.push(x);
}

function route(request, response) {
    let found = false;
    for (let item of controllers) {
        if (request.url.startsWith(item.url) && request.method === item.method) {
            item.function(request, response);
            found = true;
        }
    }
    if (!found) {
        console.log('Path not found.');
        response.write("Path not found.");
        response.end();
    }
}

function start() {
    let server = http.createServer(function (request, response) {
        console.log('');
        console.log('____________________createServer____________________');
        console.log('');
        request.path = request.url.split('/');

        let data = '';
        request.on('data', function (chunck) {
            data = data + chunck;
        });
        request.on('end', function (chunck) {
            try {
                request.data = JSON.parse(data);
            }
            catch (e) {
                request.data = data;
            }
            route(request, response);
        });
    });
    server.listen(80);
}

module.exports = {
    use: use,
    start: start,
    write: write
}