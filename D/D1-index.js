let index = require('./D1-cmd');
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
        Email: contInputs[4]
    });
});

index.a("save", function (contInputs) {
    let newsave = {
        Name: contInputs[1],
        Family: contInputs[2],
        Age: contInputs[3]
    }
    fs.writeFile('save1.txt', JSON.stringify(newsave), 'utf8', function (error) {
        if (error) {
            console.log("ERROR:", error.code);
        } else {
            console.log("File Saved");
        }
    })
});

index.a("save2", function (contsave2) {
    let savedata = {
        one: contsave2[1],
        two: contsave2[2],
        three: contsave2[3]
    }
    fs.writeFile('save2.txt', JSON.stringify(savedata), 'utf8', function (error) {
        if (error) {
            console.log("Cant Save File for Error: ", error.code);
        }
        else {
            console.log("Save File");
        }
    });
});

index.a("openfile", function (contInputs) {
    fs.readFile(contInputs[1], function (error, data) {
        if (error) {
            console.log('ERROR:', error);
        }
        else {
            console.log('Files.', data.toString())
        }
    })
});

index.a("open", function (contInputs) {
    fs.readFile(contInputs[1], function (error, data) {
        if (error) {
            if (error.code === "ENOENT") {
                console.log(error.code, ": name file or txt is wrong.");
            }
            else if (error.code === "EISDIR") {
                fs.readdir(contInputs[1], function (error2, data2) {
                    if (!error2) {
                        console.log("Files:", data2);
                    }
                    else {
                        console.log("lock open code");
                    }
                })
            }
        }
        else {
            console.log("File open.", data.toString());
        }
    })
});

index.a("saveobj", function (contInputs) {
    fs.readFile(contInputs[1], function (error, data) {
        if (error) {
            if (error.code === "ENOENT") {
                console.log(error.code, ": name file or txt is wrong.");
            }
            else if (error.code === "EISDIR") {
                console.log("Error: ", error);
            }
            else {
                console.log("Error: ", error);
            }
        }
        else {
            let getData2 = {
                One: contInputs[3],
                Two: contInputs[4],
                Three: contInputs[5]
            }

            let getData1 = data.toString(); 
            getData1 = JSON.stringify(getData1);
            getData2 = JSON.stringify(getData2);
            getData2 = getData2.toString();
            let code =  getData1 + getData2;

            fs.writeFile(contInputs[2], code, 'utf8', function (err, data) {
                if (err) {
                    console.log("ERROR:", err);
                } else {
                    console.log("File Saved.");
                }
            })
        }
    });
});

index.start();