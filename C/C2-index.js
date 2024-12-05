let use = require('./C1-cmd.js');
let fs = require('fs');

use.a("minus", function (contInputs) {
    console.log({ result: use.parseInput(contInputs[1]) - use.parseInput(contInputs[2]) });
});
use.a("sum", function (contInputs) {
    console.log({ result: use.parseInput(contInputs[1]) + use.parseInput(contInputs[2]) });
});
use.a("multiply", function (contInputs) {
    console.log({ result: use.parseInput(contInputs[1]) * use.parseInput(contInputs[2]) });
});
use.a("div", function (contInputs) {
    console.log({ result: use.parseInput(contInputs[1]) / use.parseInput(contInputs[2]) });
});
use.a("tavan", function (contInputs) {
    console.log({ result: use.parseInput(contInputs[1]) ** use.parseInput(contInputs[2]) });
});

use.a("print", function (contInputs) {
    console.log({
        name: contInputs[1],
        family: contInputs[2],
        age: (use.parseInput(contInputs[3])),
        email: contInputs[4] + '@gmail.com'
    });
});

use.a("save", function (contInputs) {
    fs.writeFile('myDatabase.txt', contInputs[1], function (error) {
        if (error) {
            console.log('ERROR:', error.code);
        }
        else {
            console.log('Save Data.', { FileData: contInputs[1] });
        }
    })
});

use.a("save2", function (contInputs) {
    let savedata = {
        one: contInputs[1],
        two: contInputs[2],
        three: contInputs[3],
        four: contInputs[4]
    }
    fs.writeFile('myDatabase.txt', JSON.stringify(savedata), function (error) {
        if (error) {
            console.log('ERROR:', error.code);
        }
        else {
            console.log('Save Data.', { FileData: savedata });
        }
    });
});

use.start();