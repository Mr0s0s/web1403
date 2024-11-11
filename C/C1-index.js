let index = require('./C1-cmd');
let fs = require('fs');

index.a("minus", function(contInputs){
    console.log(index.parseInput(contInputs[1]) - index.parseInput(contInputs[2]));
});
index.a("sum", function(contInputs){
    console.log(index.parseInput(contInputs[1]) + index.parseInput(contInputs[2]));
});
index.a("multiply", function(contInputs){
    console.log(index.parseInput(contInputs[1]) * index.parseInput(contInputs[2]));
});
index.a("div", function(contInputs){
    console.log(index.parseInput(contInputs[1]) / index.parseInput(contInputs[2]));
});

index.a("print", function(contInputs){
    console.log({
        Name: contInputs[1],
        Family: contInputs[2],
        Age: (index.parseInput(contInputs[3])),
        Email: (contInputs[4] + "@gmail.com")
    });
});

index.a("sr", function(contInputs){
    fs.writeFile('myDatabase.txt', contInputs[1], {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});

index.start();