let index = require('./C1-cmd.js');
let fs = require('fs');

index.a("minus", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) - index.parseInput(contInputs[2]));
});
index.a("sum", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) + index.parseInput(contInputs[2]));
});
index.a("multiply", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) * index.parseInput(contInputs[2]));
});
index.a("div", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) / index.parseInput(contInputs[2]));
});

index.a("print", function (contInputs) {
    console.log({
        Name: contInputs[1],
        Family: contInputs[2],
        Age: (index.parseInput(contInputs[3])),
        Email: (contInputs[4] + "gmail.com")
    });
});

index.a("save", function (contInputs) {
    fs.writeFile('myDatabase.txt', contInputs[1], { encoding: 'utf8' }, function (error) {
        if (error) {
            console.log('ERROR:', error);
        }
        else {
            console.log('File Saved.');
        }
    })
});

index.a("save2", function (contInputs) {
    let savedata = {
        one: contInputs[1],
        two: contInputs[2],
        three: contInputs[3],
        four: contInputs[4]
    }
    savedata = JSON.stringify(savedata);
    fs.writeFile('myDatabase.txt', savedata, { encoding: 'utf8' }, function (error) {
        if (error) {
            console.log('ERROR:', error);
        }
        else {
            console.log('File Saved.')
        }
    });
});

index.start();