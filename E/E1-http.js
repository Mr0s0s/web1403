let http = require('http');

function write(res, body) {
    res.write(JSON.stringify(body));
    res.end();
}

let server = http.createServer(function (req, res) {
    let equal;
    console.log('');
    console.log('__________________________________');
    console.log('');
    let inputs = req.url.split('/');

    function sum() {
        equal = {
            data: parseInt(inputs[2]) + parseInt(inputs[3])
        }
        write(res, equal);
        console.log('request:', req.url, 'Equal=', equal.data);
    }
    function multiply() {
        equal = {
            data: parseInt(inputs[2]) * parseInt(inputs[3])
        }
        write(res, equal);
        console.log('request:', req.url, 'Equal=', equal.data);
    }

    if (inputs[1] === 'sum') {
        sum();
    }
    if (inputs[1] === 'multiply') {
        multiply();
    }
});

server.listen(80);