let inputs = [];
inputs = process.argv.slice(2);
let commend = inputs[0];
let controllers = [];


function use(name, func) {
    let x = {
        commend: name,
        function: func
    };
    controllers.push(x);
}

use("sum", function (a, b) {
    return { result: parseInt(a) + parseInt(b) };
});
use("minus", function (a, b) {
    return { result: parseInt(a) - parseInt(b) };
});
use("div", function (a, b) {
    return { result: parseInt(a) / parseInt(b) };
});
use("multiply", function (a, b) {
    return { result: parseInt(a) * parseInt(b) };
});
use("tavan", function (a, b) {
    return { result: parseInt(a) ** parseInt(b) };
});


for (let itam of controllers) {
    if (commend === itam.commend) {
        console.log(itam.function(parseInt(inputs[1]), parseInt(inputs[2])));
    }
}