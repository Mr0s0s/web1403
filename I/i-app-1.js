let app = require('./i-http-1');
let fs = require('fs');

app.use('GET', '/test', function (request, response) {
    result = {
        method: request.method,
        url: request.url
    }
    console.log('result:', result);
    app.write(response, result)
});

app.use('GET', '/sum', sum);
app.use('POST', '/sum', sum);
function sum(request, response) {
    result = {
        method: request.method,
        url: request.url,
        equal: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.equal:', (request.path[2]), "+", (request.path[3]), '=', result.equal);
    app.write(response, result)
};
app.use('GET', '/multiply', multiply);
app.use('POST', '/multiply', multiply);
function multiply(request, response) {
    result = {
        method: request.method,
        url: request.url,
        equal: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.equal:', (request.path[2]), '*', (request.path[3]), "=", result.equal);
    app.write(response, result);
};

app.use('GET', '/print', function (request, response) {
    result = {
        One: request.path[2],
        Two: request.path[3],
        Three: request.path[4]
    }
    console.log('request.method:', request.method, '| request.url:', request.url, '| result:', result);
    app.write(response, result);
});

app.use('POST', '/file', function (request, response) {
    fs.writeFile(request.data.name, request.data.content, function (error) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
            app.write(response, { result: "Cant write File for: " + error.code });
        } else {
            console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
            app.write(response, {
                result: 'write File.',
                method: request.method,
                url: request.url,
                DataFile: request.data.content
            });
        }
        console.log('');
        console.log('_______GetData_postman_______');
        console.log('');
        console.log('request.data.name:', request.data.name, '| request.data.content:', JSON.stringify(request.data.content));
    })
});

app.use('GET', '/create_database', function (request, response) {
    let a = { "records": [{ "id": 1, "content": { "aaa": 11 } }, { "id": 2, "content": { "bbb": 22 } }, { "id": 3, "content": { "ccc": 333 } }, { "id": 4, "content": { "ddd": 444 } }, { "id": 5, "content": { "eee": 555 } }] }
    fs.writeFile('database.json', JSON.stringify(a), function (error) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
            app.write(response, { result: "Cant write File for: " + error.code });
        } else {
            console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
            console.log('Data File:', JSON.stringify(a));
            app.write(response, {
                result: 'write File.',
                method: request.method,
                url: request.url,
                DataFile: a
            });
        }
    })
});

app.use('POST', '/data', function (request, response) {
    fs.readFile('./database.json', function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            let getData = JSON.parse(data);
            getData.records.push(request.data);
            let string = JSON.stringify(getData);
            fs.writeFile('./database.json', string, function (error) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                    app.write(response, { result: "Cant write File for: " + error.code });
                }
                else {
                    console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
                    console.log('Data File:', string);
                    app.write(response, {
                        result: 'write File.',
                        method: request.method,
                        url: request.url,
                        DataFile: JSON.parse(string)
                    });
                }
            })
        }
    });
});

app.use('GET', '/data', function (request, response) {
    fs.readFile('./database.json', function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            console.log('read File.', '| request.method:', request.method, '| request.url:', request.url);
            console.log('Data File:', data.toString());
            app.write(response, {
                result: 'read File.',
                method: request.method,
                url: request.url,
                DataFile: JSON.parse(data)
            });
        }
    });
});

app.start();