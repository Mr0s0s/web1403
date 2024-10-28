let inputs = [];
inputs = process.argv.slice(2);
let command = inputs[0];
let controllers = [];
let fs = require('fs');

function parseInput(input) {
    if (isNaN(parseInt(input))) {
        return input;
    }
    return parseInt(input);
}

function use(name, func) {
    let x = {
        command: name,
        function: func
    };
    controllers.push(x);
}

function start() {

    function defaulterror() {
        let errort = false;
        for (let item of controllers) {
            if (item.command === command) {
                item.function(inputs);
                errort = true;
            }
        }
        if (!errort) {
            console.log('NOT FOUND.');
        }
    }

    fs.readFile('DataBase.json', function (error, data) {
        if (error) {
            if (error.code === 'ENOENT') {
                fs.writeFile('database.json', JSON.stringify({ data: [] }), { encoding: 'utf8' }, function (error, data) {
                    if (error) {
                        console.log('ERROR:', error);
                    }
                    else {
                        console.log(data.code,"Database created.")
                        defaulterror();
                    }
                })
            }
        }
        else {
            console.log("Database vjod dard")
            defaulterror();
        }
    });
}

module.exports = {
    a: use,
    start: start,
    parseInput: parseInput
}