let http = require('http');
let server = http.createServer(function (request, res) {
    console.log('');
    console.log('______________________________');
    console.log('');
    console.log('request.method:', request.method, '| request.url:', request.url);
    res.write('Hello world!');
    res.end();
});
server.listen(80);