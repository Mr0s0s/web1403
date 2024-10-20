let a = require('./B5-cmd.js');
let fs = require('fs');

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
a.a("print", function(contInputs){
    console.log({
        Name: contInputs[1],
        Family: contInputs[2],
        Age: contInputs[3],
        Email: contInputs[4]
    });
});

a.a("saverd", function(contInputs){
    fs.writeFile('myDatabase.txt', contInputs[1], {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});

a.start();