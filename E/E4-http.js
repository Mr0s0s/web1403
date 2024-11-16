let http = require('http');
let fs = require('fs');

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

    function save() {
        let x = {
            One: inputs[2],
            Two: inputs[3],
            Three: inputs[4]
        }
        fs.writeFile("save.txt", JSON.stringify(x), function (error, data) {
            if (error) {
                console.log("Cant Save File.");
                write(res, { equal: "Cant Save File." })
            }
            else {
                console.log("Save File.");
                write(res, { equal: "Save File." });
                console.log('request.method:', req.method, '| request.url:', req.url);
            }
        });
    }

    function save2() {
        let x = {
            One: inputs[3],
            Two: inputs[4],
            Three: inputs[5]
        }
        fs.writeFile(inputs[2], JSON.stringify(x), function (error, data) {
            if (error) {
                console.log("Cant Save File.");
                write(res, { equal: "Cant Save File." })
            }
            else {
                console.log("Save File.");
                write(res, { equal: "Save File." })
                console.log('request.method:', req.method, '| request.url:', req.url);

            }
        })
    }

    if (inputs[1] === "sum") {
        sum();
    }
    if (inputs[1] === 'multiply') {
        multiply();
    }
    if (inputs[1] === "print") {
        print();
    }
    if (inputs[1] === "save") {
        save();
    }
    if (inputs[1] === "save2") {
        save2();
    }
});

server.listen(80);