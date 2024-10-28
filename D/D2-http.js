let http = require('http');
let server = http.createServer(function(req, res){
    console.log('request:', req.method, req.url);
    let path = req.url.split('/');
    let sum = parseInt()
    res.write('Hello world!');
    res.end();
});
server.listen(80);