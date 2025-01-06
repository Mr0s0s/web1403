let app = require('./j-http-2');
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

app.use('PUT', '/data', function (request, response) {
    function getArrayIndex(array, id) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].id === id) {
                return i;
            }
        }
        return -1;
    }
    fs.readFile('./database.json', function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            let obj = JSON.parse(data);
            let i = getArrayIndex(obj.records, request.data.id);
            if (i < 0) {
                console.log('NOT have in id.', '| request.method:', request.method, '| request.url:', request.url);
                app.write(response, {
                    result: 'NOT have in id.',
                    method: request.method,
                    url: request.url
                });
            }
            else {
                obj.records[i].content = request.data.content;
                let string = JSON.stringify(obj);
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
        }
    });
});

app.use('GET', '/image', function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            response.writeHead(
                200,
                { 'Content-Type': 'image/jpeg' }
            );
            console.log('Open File.', '| request.method:', request.method, '| request.url:', request.url);
            response.write(data);
            response.end();
        }
    });
});

app.use('GET', '/file', function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            let ext = request.path[2].split('.')[1];
            let extt = request.path[2].split('.')[0];

            console.log('read File.', '| request.method:', request.method, '| request.url:', request.url);
            console.log({
                Namefull: extt + '.' + ext,
                Namefile_extt: extt,
                Fileextension_ext: ext
            });

            app.write(response, {
                result: 'read File.',
                method: request.method,
                url: request.url,
                Namefull: extt + '.' + ext,
                Namefile_extt: extt,
                Fileextension_ext: ext
            });
        }
    });
});

app.use('GET', '/page', function (request, response) {
    console.log('request.method:', request.method, '| request.url:', request.url);
    console.log('Hello world!', '   |txt|', '   | Value = its_Ok |');
    app.write(response, { text: 'Hello world!', Cookies_name: 'Value', data_Cookies: 'its_Ok' }, 'txt', 'Value = its_Ok');
    //Look Postman Cookies
});

app.use('GET', '/create_login', function (request, response) {
    let a = { "records": [{ "user": "amir", "pass": "123" }, { "user": "shadmehr", "pass": "1234" }, { "user": "shayan", "pass": "12345" }, { "user": "armin", "pass": "123456" }, { "user": "sadegh", "pass": "1234567" }] }
    fs.writeFile('users.json', JSON.stringify(a), function (error) {
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

app.use('GET', '/login', function (request, response) {
    function getArrayIndex(array, user, pass) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].user === user && array[i].pass === pass) {
                return i;
            }
        }
        return -1;
    }
    fs.readFile('./users.json', function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            let obj = JSON.parse(data);
            let i = getArrayIndex(obj.records, request.data.user, request.data.pass);
            if (i < 0) {
                console.log('User NOT Found.', '| request.method:', request.method, '| request.url:', request.url);
                console.log('');
                console.log('Change user or password.');
                console.log('user:', request.data.user, '| password:', request.data.pass);
                app.write(response, { result: "User not Found | Change user or password.", user: request.data.user, password: request.data.pass });
            }
            else {
                console.log('Login Done.', '| request.method:', request.method, '| request.url:', request.url);
                console.log('');
                console.log('User information.');
                console.log('user:', request.data.user, '| password:', request.data.pass);
                app.write(response, { result: "Login Done.", user: request.data.user, password: request.data.pass }, 'txt', 'Value = 12345678');
            }
        }
    });
});

app.use('POST', '/login', function (request, response) {
    function getArrayIndex(array, user, pass) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].user === user && array[i].pass === pass) {
                return i;
            }
        }
        return -1;
    }
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    fs.readFile('./users.json', function (error, fileData) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            let obj = JSON.parse(fileData);
            let i = getArrayIndex(obj.records, request.data.user, request.data.pass);
            if (i < 0) {
                console.log('User NOT Found.', '| request.method:', request.method, '| request.url:', request.url);
                console.log('');
                console.log('Change user or password.');
                console.log('user:', request.data.user, '| password:', request.data.pass);
                app.write(response, { result: "User not Found | Change user or password.", user: request.data.user, password: request.data.pass });
            }
            else {
                let token = getRandomInt(100000000000).toString();
                obj.records[i].token = token;
                let string = JSON.stringify(obj);
                fs.writeFile('./users.json', string, function (error) {
                    if (error) {
                        console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                        app.write(response, { result: "Cant write File for: " + error.code });
                    }
                    else {
                        console.log('Login Done.', '| request.method:', request.method, '| request.url:', request.url);
                        console.log('');
                        console.log('User information.');
                        console.log('user:', request.data.user, '| password:', request.data.pass);
                        app.write(response, { result: "Login Done.", user: request.data.user, password: request.data.pass }, 'txt', 'Token = ' + token);
                    }
                })
            }
        }
    })
});

//j-app-3.js has update function write in project j-http-2.js "اپدیت برای نساختن کلید برای کوکی در زمان وجود نداشتن ان است"

app.start();