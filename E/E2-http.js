let http = require('http');

function write(res, body){
    res.write(JSON.stringify(body));
    res.end();
}

let server = http.createServer(function(req, res){
    console.log('request:', req.method, req.url);
    let inputs = req.url.split('/');
    let equal;

    function sum(){
        equal = {
            data: parseInt(inputs[2]) + parseInt(inputs[3])
        }
        write(res, equal);
    }
    function multiply(){
        equal = {
            data: parseInt(inputs[2]) * parseInt(inputs[3])
        }
        write(res, equal);
    }
    function print(){
        equal={
            One:inputs[2],
            Two:inputs[3],
            Three:inputs[4]
        }
        write(res, equal);
    }

    if(inputs[1] === 'sum'){
        sum();
    }
    if(inputs[1] === 'multiply'){
        multiply();
    }
    if(inputs[1] === 'print'){
        print();
    }

});

server.listen(80);