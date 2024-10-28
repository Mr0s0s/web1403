let http = require('http');
let server = http.createServer(function (req, res) {
    let getData = req.url
    let x = getData.split("/");
    x.shift()
    let z = x[0] + x[1];
    res.write(z);
    res.end();
});
server.listen(80);