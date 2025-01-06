let http = require('http');
let fs = require('fs');
let controllers = [];

function write(res, body, ext, cookie) {
    if (!ext) {
        ext = 'json';
    }
    let types = {
        'txt': 'text/plain',
        'html': 'text/html',
        'jpg': 'image/jpeg',
        'json': 'application/json'
    }
    if (!cookie) {
        res.writeHead(200, {
            'Content-Type': types[ext]
        });
    }
    else {
        res.writeHead(200, {
            'Content-Type': types[ext],
            'Set-Cookie': cookie
        });
    }
    res.write(body);
    res.end();
}

function checkUser(userToken, callback) {
    fs.readFile('./users.json', function (error, data) {
        if (error) {
            console.log('readFile FAIL', error);
            callback(false);
        } else {
            let obj = JSON.parse(data);
            let user = obj.records.find(record => record.token === userToken);
            if (user) {
                if (Date.now() > user.tokenExpiration) {
                    callback(false);
                } else {
                    callback(true);
                }
            } else {
                callback(false);
            }
        }
    });
}

function parseCookie(string) {
    if (!string) return null;
    let cookies = {};
    string.split(';').forEach(cookie => {
        let parts = cookie.split('=');
        cookies[parts[0].trim()] = parts[1];
    });
    return cookies;
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
        request.on('data', function (chunk) {
            data = data + chunk;
        })
        request.on('end', function () {
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
    checkUser: checkUser,
    parseCookie: parseCookie
}