let inputs = process.argv.slice(2);
let command = inputs[0];
let controllers = [];

function parseInput(input){
    if(isNaN(parseInt(input))){
        return input;
    }
    return parseInt(input);
}

function use(name, func){
    let x = {
        command: name,
        function: func
    };
    controllers.push(x);
}

function start(){
    let errort = false;
    for(let item of controllers){
        if(item.command === command){
            item.function(inputs);
            errort = true;
        }
    }
    if(!errort){
        console.log('NOT FOUND.');
    }
}

module.exports = {
    a: use,
    start: start,
    parseInput: parseInput
}
