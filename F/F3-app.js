let app = require('./F3-http');
let http = require('http');
let fs = require('fs');

app.use('/test', function (request, response) {
    result = {
        data_method: request.method,
        data_url: request.url
    }
    console.log('request.method:', request.method, '| request.url:', request.url, '| result:', result);
    app.write(response, result)
});

app.use('/sum', function (request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result)
});

app.use('/minus', function (request, response) {
    result = {
        data: parseInt(request.path[2]) - parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result)
});

app.use('/multiply', function (request, response) {
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result)
});

app.use('/div', function (request, response) {
    result = {
        data: parseInt(request.path[2]) / parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result)
});

app.use('/tavan', function (request, response) {
    result = {
        data: parseInt(request.path[2]) ** parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result)
});

app.use('/print', function (request, response) {
    result = {
        One: request.path[2],
        Two: request.path[3],
        Three: request.path[4]
    }
    console.log('request.method:', request.method, '| request.url:', request.url, '| result:', result);
    app.write(response, result);
});

app.use('/save', function (request, response) {
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
            console.log('Save File.', '| request.method:', request.method, '| request.url:', request.url, '| File Data.', x);
            app.write(response, { result: 'Save File.' + '| Data File: ' + JSON.stringify(x) });
        }
    })
});

app.use("/open", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            app.write(response, { result: 'Cant Open File for: ' + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Open File:', error.code);
        } else {
            let x = data.toString()
            x = JSON.parse(x)
            console.log('Open File.', '| request.method:', request.method, '| request.url:', request.url, '| File Data:', x);
            app.write(response, { result: 'Data File: ' + JSON.stringify(x) })
        }
    })
});

app.use('/createjson', function (request, response) {
    let x = { "records": [] };
    fs.writeFile('data.json', JSON.stringify(x), function (error) {
        if (error) {
            app.write(response, { result: "Cant Save File for: " + error.code });
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant Save File for:', error.code);
        }
        else {
            console.log('Save File.', '| request.method:', request.method, '| request.url:', request.url, '| File Data.', x);
            app.write(response, { result: 'Save File.' + '| Data File: ' + JSON.stringify(x) });
        }
    })
});

app.use("/addobj", function (request, response) {
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
                    console.log('Save Change.', '| request.method:', request.method, '| request.url:', request.url, '| File Data.', x);
                    app.write(response, { result: 'Save Change.' + '| Data File: ' + x });
                }
            })
        }
    })
});

app.start();