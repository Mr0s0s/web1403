let http = require('http');

function write(res, body) {
    res.write(JSON.stringify(body));
    res.end();
}

let server = http.createServer(function (req, res) {
    console.log('__________________________________');
    console.log('');
    let inputs = req.url.split('/');
    let equal;

    function sum() {
        equal = {
            data: parseInt(inputs[2]) + parseInt(inputs[3])
        }
        write(res, equal);
        console.log('request.method:', req.method, '| request.url:', req.url, '| Equal=', equal.data);

    }
    function multiply() {
        equal = {
            data: parseInt(inputs[2]) * parseInt(inputs[3])
        }
        write(res, equal);
        console.log('request.method:', req.method, '| request.url:', req.url, '| Equal=', equal.data);

    }
    function print() {
        equal = {
            One: inputs[2],
            Two: inputs[3],
            Three: inputs[4]
        }
        write(res, equal);
        console.log('request.method:', req.method, '| request.url:', req.url);

    }

    if (inputs[1] === 'sum') {
        sum();
    }
    if (inputs[1] === 'multiply') {
        multiply();
    }
    if (inputs[1] === 'print') {
        print();
    }

});

server.listen(80);