let inputs = [];
inputs = process.argv.slice(2);
let command = inputs[0];
let controllers = [];

function parseInputs(input) {
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

use("sum", function (a, b) {
    return { result: parseInputs(a) + parseInputs(b) };
});
use("minus", function (a, b) {
    return { result: parseInputs(a) - parseInputs(b) };
});
use("div", function (a, b) {
    return { result: parseInputs(a) / parseInputs(b) };
});
use("multiply", function (a, b) {
    return { result: parseInputs(a) * parseInputs(b) };
});
use("tavan", function (a, b) {
    return { result: parseInputs(a) ** parseInputs(b) };
});

let error = false;
for (let item of controllers) {
    if (item.command === command) {
        console.log(item.function(parseInputs(inputs[1]), parseInputs(inputs[2])));
        error = true;
    }
}
if (!error) {
    console.log('NOT FOUND');
}