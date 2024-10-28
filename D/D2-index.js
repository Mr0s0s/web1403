let index = require('./C1-cmd');
let fs = require('fs');

index.a("minus", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) - index.parseInput(contInputs[2]))
});
index.a("sum", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) + index.parseInput(contInputs[2]))
});
index.a("multiply", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) * index.parseInput(contInputs[2]))
});
index.a("div", function (contInputs) {
    console.log(index.parseInput(contInputs[1]) / index.parseInput(contInputs[2]))
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
    fs.writeFile('Database_save1.txt', JSON.stringify(newsave), 'utf8', function (error) {
        if (error) {
            console.log("ERROR:", error);
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
    savedata = JSON.stringify(savedata);
    fs.writeFile('Database_save2.txt', savedata, { encoding: 'utf8' }, function (error, save2) {
        if (error) {
            console.log("Cant Save File", error);
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
                console.log(error.code, ":name file or txt Not drst.");
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
                console.log(error.code, ":name file or txt Not drst.");
            }
            else if (error.code === "EISDIR") {
                console.log(error.code, ": not txt has folder or ...");
            }
            else {
                console.log("Error: ", error);
            }
        }
        else {
            let getData = JSON.parse(data);
            // getData = data.toString()
            let newObj = {
                One: contInputs[2],
                Two: contInputs[3],
                Three: contInputs[4]
            }
            let database;
            database = getData.data + newObj.data;

            fs.writeFile('Database_saveobj.txt', JSON.stringify(database), { encoding: 'utf8' }, function (err, data) {
                if (err) {
                    console.log("ERROR:", err);
                } else {
                    console.log("File Saved!");
                }
            })
        }
    });
});

index.start();