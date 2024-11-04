let http = require('http');
let server = http.createServer(function(req, res){
    console.log('request:', req.method, req.url);
    res.write('Hello world!');
    res.end();
});
server.listen(80);