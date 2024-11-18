let app = require('./G2-http');
let fs = require('fs');

app.use('GET', '/test', function (request, response) {
    result = {
        data: request.url
    }
    console.log(request.method, request.url);
    app.write(response, result)
});

app.use('GET', '/sum', sum);
app.use('POST', '/sum', sum);
function sum(request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    console.log('GET', 'request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result);
}

app.use('GET', '/multiply', function (request, response) {
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    console.log('GET', 'request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result);
});

app.use('GET', '/print', function (request, response) {
    result = {
        One: request.path[2],
        Two: request.path[3],
        Three: request.path[4]
    }
    console.log('request.method:', request.method, '| request.url:', request.url);
    app.write(response, result);
});

app.use('GET', '/save', function (request, response) {
    let x = {
        One: request.path[2],
        Two: request.path[3],
        Three: request.path[4]
    }
    fs.writeFile('save.txt', JSON.stringify(x), function (error, data) {
        if (error) {
            app.write(response, { result: "Cant Save File." });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Save File.');
        }
        else {
            app.write(response, { result: "File Save." });
            console.log('request.method:', request.method, '| request.url:', request.url, '| File Save.');
        }
    })
});

app.use('GET', "/open", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            console.log("ERROR: ", error.code);
            app.write(response, error.code);

        } else {
            result = data.toString()
            console.log('request.method:', request.method, '| request.url:', request.url, '| result:', result);
            app.write(response, { result: JSON.parse(result) })
        }
    })
});

app.use('GET', "/addobj", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            console.log("ERROR: ", error.code);
            app.write(response, error.code);
        }
        else {
            let getData = data.toString();
            getData = JSON.parse(getData);
            let newOBJ = {
                One: request.path[3],
                Two: request.path[4],
                Three: request.path[5]
            }
            let z;
            z = JSON.stringify(getData) + JSON.stringify(newOBJ);
            fs.writeFile(request.path[2], JSON.stringify(z), function (error) {
                if (error) {
                    console.log("ERROR: ", error.code);
                    app.write(response, error.code);

                } else {
                    result = "Save Change"
                    app.write(response, result);
                    console.log("save: ");
                }
            })
        }
    })
});

app.use('POST', '/write', function (request, response) {
    fs.writeFile(request.data.name, request.data.content, function (error) {
        if (error) {
            console.log("ERROR:", error.code);
            app.write(response, "ERROR");
        } else {
            console.log("File Saved.");
            app.write(response, "File Saved postman.")
        }
        console.log('_______GetData_postman_______');
        console.log('');
        console.log('request.data.name:', request.data.name, '| request.data.content:', request.data.content);
    })
});

app.use('POST', "data", function (response, request) {
    fs.readFile(request.data.name, function (error, data) {
        if (error) {
            console.log("ERROR123:", error.code);
            app.write(response, "ERROR123");
        }
        else {
            let obj = JSON.parse(data);
            obj.records.push(request.data);
            let staring = JSON.staringfy(obj);
            fs.writeFile(request.data.name, staring, function (error, data) {
                if (error) {
                    console.log("ERROR:", error.code);
                    app.write(response, "ERROR");
                }
                else {
                    console.log("Save File:", { result: obj.data });
                    app.write(response, "Save File");
                }
            })
        }
        console.log('_______GetData_postman_______');
        console.log('');
        console.log('request.data.name:', request.data.name, '| request.data.content:', request.data.content);
    })
});

app.use('GET', '/data2', function (request, response) {
    fs.readFile(request.data.name, function (error, data) {
        if (error) {
            console.log("ERROR:", error.code);
            app.write(response, "ERROR");
        }
        else {
            app.write(response, JSON.parse(data));
            console.log("Save File:", { result: obj.data });
        }
    });
});

app.use('id', function (request, response) {
    fs.readFile('./database.json', function (error, data) {
        if (error) {
            console.log("ERROR:", error.code);
            app.write(response, "ERROR");
        }
        else {
            app.write(response, JSON.parse(data));
        }
    })
});

app.start();