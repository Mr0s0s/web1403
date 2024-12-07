let http = require('http');
let server = http.createServer(function (request, res) {
    let inputs = request.url.split('/');
    inputs.shift()
    console.log('');
    console.log('______________________________');
    console.log('');
    console.log('request.method: ', request.method, '| request.url: ', request.url, '| inputs:', inputs[0] +' '+ inputs[1]);
    res.write(inputs.toString());
    res.end();
});
server.listen(80);