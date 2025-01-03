let http = require('http');
let controllers = [];

function write(response, body, ext, cookie) {
    if (!ext) {
        ext = 'json';
    }
    if (!cookie) {
        if (!cookie) {
            response.writeHead(200, {
                'Content-Type': types[ext]
            });
        }
        else {
            response.writeHead(200, {
                'Content-Type': types[ext],
                'Set-Cookie': cookie
            });
        }
    }

    let types = {
        'txt': 'text/plain',
        'html': 'text/html',
        'jpg': 'image/jpeg',
        'json': 'application/json'
    }

    response.writeHead(200, {
        'Content-Type': types[ext],
        'Set-Cookie': cookie
    });
    response.write(JSON.stringify(body));
    response.end();
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
        console.log('request.method:', request.method, "| request.url:", request.url, '| Path not found.');
        response.write('Path not found.');
        response.end();
    }
}

function start() {
    let server = http.createServer(function (request, response) {
        console.log('');
        console.log('____________________CreateServer____________________');
        console.log('');
        request.path = request.url.split('/');

        let data = '';
        request.on('data', function (chunck) {
            data = data + chunck;
        })
        request.on('end', function (chunck) {
            try {
                request.data = JSON.parse(data);
            }
            catch (e) {
                request.data = data;
            }
            route(request, response);
        })
    });
    server.listen(80);
}

module.exports = {
    use: use,
    start: start,
    write: write,
}