let inputs = process.argv.slice(2);
let command = inputs[0];

let controllers = [];

function parseInputs(inputs){
    return parseInt(inputs);
}

function use(name, func){
    let x = {
        command: name,
        function: func
    };
    controllers.push(x);
}

use("minus", function(a, b){
    return a - b
});
use("sum", function(a, b){
    return a + b
});
use("multiply", function(a, b){
    return a * b
});
use("div", function(a, b){
    return a / b
});

let errort = false;

for(let item of controllers){
    if(item.command === command){
        console.log(item.function(parseInputs(inputs[1]), parseInputs(inputs[2])));
        errort = true;
    }
}    
if(!errort){
    console.log('NOT FOUND');
}