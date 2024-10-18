let a = require('./B4-cmd.js');

a.a("minus", function(contInputs){
    console.log(a.parseInput(contInputs[1]) - a.parseInput(contInputs[2]));
});
a.a("sum", function(contInputs){
    console.log(a.parseInput(contInputs[1]) + a.parseInput(contInputs[2]));
});
a.a("multiply", function(contInputs){
    console.log(a.parseInput(contInputs[1]) * a.parseInput(contInputs[2]));
});
a.a("div", function(contInputs){
    console.log(a.parseInput(contInputs[1]) / a.parseInput(contInputs[2]));
});
a.a("printRecord", function(contInputs){
    console.log({
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3],
        email: contInputs[4]
    });
});

a.start();