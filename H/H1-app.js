let app = require('./H1-http');
let fs = require('fs')

app.use('GET', '/test', function (request, response) {
    result = {
        data_method: request.method,
        data_url: request.url
    }
    console.log('result:', result);
    app.write(response, result)
});

app.use('GET', '/sum', sum);
app.use('POST', '/sum', sum);
function sum(request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', (request.path[2]), "+", (request.path[3]), '=', result.data);
    app.write(response, result)
};

app.use('GET', '/multiply', function (request, response) {
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', (request.path[2]), '*', (request.path[3]), "=", result.data);
    app.write(response, result);
});

app.use('GET', '/minus', function (request, response) {
    result = {
        data: parseInt(request.path[2]) - parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', (request.path[2]), '-', (request.path[3]), "=", result.data);
    app.write(response, result)
});

app.use('GET', '/div', function (request, response) {
    result = {
        data: parseInt(request.path[2]) / parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', (request.path[2]), '/', (request.path[3]), "=", result.data);
    app.write(response, result)
});

app.use('GET', '/tavan', function (request, response) {
    result = {
        data: parseInt(request.path[2]) ** parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', (request.path[2]), '**', (request.path[3]), "=", result.data);
    app.write(response, result)
});

app.use('GET', '/print', function (request, response) {
    result = {
        One: request.path[2],
        Two: request.path[3],
        Three: request.path[4]
    }
    console.log('request.method:', request.method, '| request.url:', request.url, '| result:', result);
    app.write(response, result);
});

app.use('GET', '/save', function (request, response) {
    let x = {
        One: request.path[3],
        Two: request.path[4],
        Three: request.path[5]
    }
    fs.writeFile(request.path[2], JSON.stringify(x), function (error) {
        if (error) {
            app.write(response, { result: "Cant Save File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Save File for:', error.code);
        }
        else {
            console.log('File save.', '| request.method:', request.method, '| request.url:', request.url, '| NameFile:', request.path[2], '| FileData:', x);
            app.write(response, { result: "File Save." + '| NameFile:' + request.path[2] + '| FileData:' + JSON.stringify(x) });
        }
    })
});

app.use('GET', "/open", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            app.write(response, error.code);
            console.log("request.method:", request.method, "| request.url:", request.url, "| ERROR:", error.code);
        } else {
            result = data.toString()
            console.log('Open File.', 'request.method:', request.method, '| request.url:', request.url, '| NameFile:', request.path[2], '| result:', JSON.parse(result));
            app.write(response, { result: 'Open File.' + '| NameFile:' + request.path[2] + '| FileData: ' + result })
        }
    })
})

app.use('GET', '/createjson', function (request, response) {
    let x = { "records": [] };
    fs.writeFile('data.json', JSON.stringify(x), function (error) {
        if (error) {
            app.write(response, { result: "Cant Save File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Save File for:', error.code);
        }
        else {
            console.log('Save File.', '| request.method:', request.method, '| request.url:', request.url, '| NameFile:', request.path[2], '| File Data.', x);
            app.write(response, { result: 'Save File.' + '| NameFile:' + request.path[2] + '| FileData: ' + JSON.stringify(x) });
        }
    })
});

app.use('GET', "/addobj", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            app.write(response, { result: 'Cant readFile for: ' + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant readFile:', error.code);
        }
        else {
            let getData = data.toString();
            getData = JSON.parse(getData);
            let newOBJ = [{
                One: request.path[4],
                Two: request.path[5],
                Three: request.path[6]
            }]
            newOBJ.push(getData)
            let x = JSON.stringify(newOBJ);
            fs.writeFile(request.path[3], x, function (error) {
                /* فایل حتما باید از نوع json باشد */
                if (error) {
                    app.write(response, { result: "Cant Save File for: " + error.code });
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Save File for:', error.code);
                } else {
                    console.log('Save Change.', '| request.method:', request.method, '| request.url:', request.url, '| Namejson:', request.path[3], '| File Data.', x);
                    app.write(response, { result: 'Save Change.' + '| NameFile:' + request.path[2] + '| Data File: ' + x });
                }
            })
        }
    })
});

app.use('POST', '/write', function (request, response) {
    fs.writeFile(request.data.name, request.data.content, function (error) {
        if (error) {
            app.write(response, { result: "Cant write File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
        } else {
            console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
            app.write(response, { result: 'write File.' + '| request.method:' + request.method + '| request.url:' + request.url + '| Data File: ' + request.data.content });
        }
        console.log('');
        console.log('_______GetData_postman_______');
        console.log('');
        console.log('request.data.name:', request.data.name, '| request.data.content:', request.data.content);
    })
});

app.use('POST', "/data", function (request, response) {
    fs.readFile(request.data.name, function (error, data) {
        if (error) {
            app.write(response, { result: "Cant read File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
        }
        else {

            let getData = data.toString();
            getData = JSON.parse(getData);
            let newOBJ = [request.data.content]
            newOBJ.push(getData)
            let x = JSON.stringify(newOBJ);

            fs.writeFile(request.data.name, x, function (error) {
                if (error) {
                    app.write(response, { result: "Cant write File for: " + error.code });
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                }
                else {
                    console.log('Change File.', '| request.method:', request.method, '| request.url:', request.url, '| Data File: ', x);
                    app.write(response, { result: 'Change File.' + '| request.method:' + request.method + '| request.url:' + request.url + '| Data File: ' + x });
                }
            })
        }
        console.log('');
        console.log('_______GetData_postman_______');
        console.log('');
        console.log('request.data.name:', request.data.name, '| request.data.content:', request.data.content);
    })
});

app.use('GET', '/data2', function (request, response) {
    fs.readFile(request.data.name, function (error, data) {
        if (error) {
            app.write(response, { result: "Cant Open File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Open File for:', error.code);
        }
        else {
            console.log('Open File.', 'Name File:', request.data.name, '| request.method:', request.method, '| request.url:', request.url, '| Data File: ', data.toString());
            app.write(response, { result: 'Name File:' + request.data.name + '| request.method:' + request.method + '| request.url:' + request.url + '| Data File: ' + data });
        }
    });
});

app.use('GET', '/id', function (request, response) {
    fs.readFile('./DataBase.json', function (error, data) {
        if (error) {
            app.write(response, { result: "Cant read File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
        }
        else {
            console.log('Open File.', 'Name File:', request.data.name, '| request.method:', request.method, '| request.url:', request.url, '| Data File: ', data.toString());
            app.write(response, { result: 'Name File:' + request.data.name + '| request.method:' + request.method + '| request.url:' + request.url + '| Data File: ' + JSON.parse(data) });
        }
    })
});

app.use('GET', '/delete', function (request, response) {
    fs.readFile('./DataBase.json', function (error, data) {
        if (error) {
            app.write(response, { result: "Cant read File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
        }
        else {

            let obj = JSON.parse(data);
            let i = 0;
            for (item of obj.records) {
                if (item.id === request.params[2]) {
                    obj.records.splice(i, 1);
                }
                i++;
            }

            let string = JSON.stringify(obj);
            fs.writeFile('./DataBase.json', string, function (error2) {
                if (error2) {
                    app.write(response, { result: "Cant write File for: " + error.code });
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                }
                else {
                    console.log('Change File.', '| request.method:', request.method, '| request.url:', request.url, '| Data File: ', string);
                    app.write(response, { result: 'Change File.' + '| request.method:' + request.method + '| request.url:' + request.url + '| Data File: ' + string });
                }
            })
        }
    });
});

app.start();