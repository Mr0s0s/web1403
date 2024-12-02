let inputs = [];
inputs = process.argv.slice(2);
let command = inputs[0];
let controllers = [];


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
    let error = false;
    for (let item of controllers) {
        if (item.command === command) {
            item.function(inputs);
            error = true;
        }
    }
    if (!error) {
        console.log('NOT FOUND.');
    }
}

module.exports = {
    a: use,
    start: start,
    parseInput: parseInput
}