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

use.a("openfile", function (contInputs) {
    fs.readFile(contInputs[1], function (error, data) {
        if (error) {
            console.log('ERROR:', error.code);
            console.log("file or txt Not Found.");
        }
        else {
            console.log('FileData.', JSON.parse(data));
        }
    });
});

use.a("open", function (contInputs) {
    fs.readFile(contInputs[1], function (error, data) {
        if (error) {
            if (error.code === "ENOENT") {
                console.log("file or txt Not Found.");
            }
            else if (error.code === "EISDIR") {
                fs.readdir(contInputs[1], function (error, data) {
                    if (error) {
                        console.log('ERROR:', error.code);
                    } else {
                        console.log("Files:", JSON.stringify(data));
                    }
                })
            }
        }
        else {
            console.log("FileData.", JSON.parse(data));
        }
    })
});

use.a("saveobj", function (contInputs) {
    fs.readFile(contInputs[1], function (error, data) {
        if (error) {
            if (error.code === "ENOENT") {
                console.log(error.code, ": file or txt Not Found.");
            }
            else if (error.code === "EISDIR") {
                console.log("Error: ", error.code);
            }
            else {
                console.log("Error: ", error);
            }
        }
        else {
            let ary = [];

            let newObj = {
                name: contInputs[3],
                family: contInputs[4],
                age: use.parseInput(contInputs[5])
            }

            let Previousdata = data.toString()
            newObj = data.toString()
            newObj = JSON.parse(newObj)

            ary.push(Previousdata)
            ary.push(newObj)

            fs.writeFile(contInputs[2], JSON.stringify(ary), function (error) {
                if (error) {
                    console.log("ERROR:", error);
                } else {
                    console.log('Save Data.', ary);
                }
            })
        }
    });
});




use.start();