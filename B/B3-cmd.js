let inputs = [];
inputs = process.argv.slice(2);
let command = inputs[0];
let controllers = [];
let errort = false;


function parseInputs(inputs) {
    return parseInt(inputs);
}

function use(name, func) {
    let x = {
        command: name,
        function: func
    };
    controllers.push(x);
}

function start() {
    
    for (let item of controllers) {
        if (item.command === command) {
            console.log(item.function(parseInputs(inputs[1]), parseInputs(inputs[2])));
            errort = true;
        }
    }
    if (!errort) {
        console.log('NOT FOUND');
    }
}
module.exports = {
    ww: use,
    startt: start
}