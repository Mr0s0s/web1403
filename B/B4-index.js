let ues = require('./B4-cmd.js');

ues.a("minus", function (contInputs) {
    console.log(ues.parseInput(contInputs[1]) - ues.parseInput(contInputs[2]));
});
ues.a("sum", function (contInputs) {
    console.log(ues.parseInput(contInputs[1]) + ues.parseInput(contInputs[2]));
});
ues.a("multiply", function (contInputs) {
    console.log(ues.parseInput(contInputs[1]) * ues.parseInput(contInputs[2]));
});
ues.a("div", function (contInputs) {
    console.log(ues.parseInput(contInputs[1]) / ues.parseInput(contInputs[2]));
});
ues.a("print", function (contInputs) {
    console.log({
        name: contInputs[1],
        family: contInputs[2],
        age: (ues.parseInput(contInputs[3])),
        email: contInputs[4]
    });
});

ues.start();