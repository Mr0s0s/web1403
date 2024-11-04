let http = require('http');
let fs = require('fs');
const { on } = require('events');

function write(res, body) {
    res.write(JSON.stringify(body));
    res.end();
}

let server = http.createServer(function (req, res) {
    console.log('request:', req.method, req.url);
    let inputs = req.url.split('/');
    let equal;

    function sum() {
        equal = {
            data: parseInt(inputs[2]) + parseInt(inputs[3])
        }
        write(res, equal);
    }
    function multiply() {
        equal = {
            data: parseInt(inputs[2]) * parseInt(inputs[3])
        }
        write(res, equal);
    }
    function print() {
        equal = {
            One: inputs[2],
            Two: inputs[3],
            Three: inputs[4]
        }
        write(res, equal);
    }
    function save() {
        let getdata = {
            One: inputs[3],
            Two: inputs[4],
            Three: inputs[5]
        }
        fs.writeFile(inputs[2],JSON.stringify(getdata),function(error,data){
            if(error){
                console.log("ERROR",error.code);
                write(res, { equal: 'ERROR:', error });
            }
            else{
                console.log("File Save.");
                write(res, { equal: 'File Save:'});
            }
        })
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
    if (inputs[1] === 'save') {
        save();
    }
});

server.listen(80);