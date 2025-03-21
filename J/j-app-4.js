let app = require('./j-http-3');
let fs = require('fs');

app.use('GET', '/test', function (request, response) {
    function check(found) {
        if (found) {
            result = {
                method: request.method,
                url: request.url
            }
            app.write(response, JSON.stringify(result));
            console.log('method:', request.method, '| url:', request.url);
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/sum', sum);
app.use('POST', '/sum', sum);
function sum(request, response) {
    function check(found) {
        if (found) {
            result = {
                method: request.method,
                url: request.url,
                equal: parseInt(request.path[2]) + parseInt(request.path[3])
            };
            app.write(response, JSON.stringify(result));
            console.log('request.method:', request.method, '| request.url:', request.url, '| result.equal:', (request.path[2]), "+", (request.path[3]), '=', result.equal);
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
};

app.use('GET', '/multiply', multiply);
app.use('POST', '/multiply', multiply);
function multiply(request, response) {
    function check(found) {
        if (found) {
            result = {
                method: request.method,
                url: request.url,
                equal: parseInt(request.path[2]) * parseInt(request.path[3])
            };
            app.write(response, JSON.stringify(result));
            console.log('request.method:', request.method, '| request.url:', request.url, '| result.equal:', (request.path[2]), "*", (request.path[3]), '=', result.equal);
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
};

app.use('GET', '/print', print)
app.use('POST', '/print', print)
function print(request, response) {
    function check(found) {
        if (found) {
            result = {
                One: request.path[2],
                Two: request.path[3],
                Three: request.path[4]
            }
            app.write(response, JSON.stringify(result));
            console.log('result: ', result);
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
};

app.use('POST', '/file', function (request, response) {
    function check(found) {
        if (found) {
            fs.writeFile(request.data.name, request.data.content, function (error) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                    app.write(response, { result: "Cant write File for: " + error.code });
                } else {
                    console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
                    app.write(response, 'write File.');
                }
                console.log('');
                console.log('_______GetData_postman_______');
                console.log('');
                console.log('request.data.name:', request.data.name, '| request.data.content:', JSON.stringify(request.data.content));
            })
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/create_database', function (request, response) {
    function check(found) {
        if (found) {
            let a = { "records": [{ "id": 1, "content": { "aaa": 11 } }, { "id": 2, "content": { "bbb": 22 } }, { "id": 3, "content": { "ccc": 333 } }, { "id": 4, "content": { "ddd": 444 } }, { "id": 5, "content": { "eee": 555 } }] }
            fs.writeFile('database.json', JSON.stringify(a), function (error) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                    app.write(response, { result: "Cant write File for: " + error.code });
                } else {
                    console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
                    console.log('Data File:', JSON.stringify(a));
                    app.write(response, 'write File.');
                }
            })
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('POST', '/data', function (request, response) {
    function check(found) {
        if (found) {
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
                            console.log('Data File:', string.toString());
                            app.write(response, 'write File.');
                        }
                    })
                }
            });
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/data', function (request, response) {
    function check(found) {
        if (found) {
            fs.readFile('./database.json', function (error, data) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
                    app.write(response, { result: "Cant read File for: " + error.code });
                }
                else {
                    console.log('read File.', '| request.method:', request.method, '| request.url:', request.url);
                    console.log('Data File:', data.toString());
                    app.write(response, 'read File.' + data);
                }
            });
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('PUT', '/data', function (request, response) {
    function check(found) {
        if (found) {
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
                                console.log('Data File:', string.toString());
                                app.write(response, 'Updates File.');
                            }
                        })
                    }
                }
            });
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/image', function (request, response) {
    function check(found) {
        if (found) {
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
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/file', function (request, response) {
    function check(found) {
        if (found) {
            fs.readFile(request.path[2], function (error, data) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
                    app.write(response, { result: "Cant read File for: " + error.code });
                }
                else {
                    let ext = request.path[2].split('.')[1];
                    let extt = request.path[2].split('.')[0];

                    console.log('read File.', '| request.method:', request.method, '| request.url:', request.url);
                    console.log('Namefull:', extt, '.', ext, '| Namefile_extt:', extt, '| Fileextension_ext:', ext);
                    app.write(response, 'read File.');
                }
            });
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/page', function (request, response) {
    function check(found) {
        if (found) {
            console.log('request.method:', request.method, '| request.url:', request.url);
            console.log('Hello world!', '    |txt|', '    | Value = its_Ok|');
            app.write(response, 'Hello world!', 'txt', 'Value = its_Ok');
            //Look Postman Cookies
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('GET', '/create_login', function (request, response) {
    function check(found) {
        if (found) {
            let a = { "records": [{ "user": "amir", "pass": "123" }, { "user": "shadmehr", "pass": "1234" }, { "user": "shayan", "pass": "12345" }, { "user": "armin", "pass": "123456" }, { "user": "sadegh", "pass": "1234567" }] }
            fs.writeFile('users.json', JSON.stringify(a), function (error) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                    app.write(response, { result: "Cant write File for: " + error.code });
                } else {
                    console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
                    console.log('Data File:', JSON.stringify(a));
                    app.write(response, 'write File.');
                }
            })
        }
        else {
            app.write(response, "User not found.", "txt");
            console.log('result: User not found.');
        }
    }
    app.checkUser(app.parseCookie(request.headers.cookie), check);
});

app.use('POST', '/Sign_up', function (request, response) {
    fs.readFile('./users.json', function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, { result: "Cant read File for: " + error.code });
        }
        else {
            let getData = JSON.parse(data);
            getData.records.push(request.data);
            let string = JSON.stringify(getData);
            fs.writeFile('./users.json', string, function (error) {
                if (error) {
                    console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write New user for:', error.code);
                    app.write(response, { result: "Cant write New user for:: " + error.code });
                }
                else {
                    console.log('write New user', '| request.method:', request.method, '| request.url:', request.url);
                    console.log('Data File:', string.toString());
                    app.write(response, 'write New user.');
                }
            })
        }
    });
});

app.use('PUT', '/Sign_up', function (request, response) {

    function getArrayIndex(array, user) {
        for (let i = 0; i < array.length; i++) {
            if (array[i].user === user) {
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
            let i = getArrayIndex(obj.records, request.data.user);
            if (i < 0) {
                console.log('NOT have in user.', '| request.method:', request.method, '| request.url:', request.url);
                app.write(response, 'NOT have in user.');
            }
            else {
                obj.records[i].pass = request.data.pass;
                let string = JSON.stringify(obj);
                fs.writeFile('./users.json', string, function (error) {
                    if (error) {
                        console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for:', error.code);
                        app.write(response, { result: "Cant write File for: " + error.code });
                    }
                    else {
                        console.log('write File.', '| request.method:', request.method, '| request.url:', request.url);
                        console.log('Data File:', string.toString());
                        app.write(response, 'Updates File.');
                    }
                })
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

    fs.readFile('./users.json', { encoding: 'utf8' }, function (error, data) {
        if (error) {
            console.log('request.method:', request.method, '| request.url:', request.url, '| Cant read File for:', error.code);
            app.write(response, "Cant read File for Error: " + error.code);
        }
        else {
            let obj = JSON.parse(data);
            let i = getArrayIndex(obj.records, request.data.user, request.data.pass);
            if (i < 0) {
                console.log('User NOT Found.', '| request.method:', request.method, '| request.url:', request.url);
                console.log('');
                console.log('Change user or password.');
                console.log('user:', request.data.user, '| password:', request.data.pass);
                app.write(response, "User not Found | Change user or password." + ' | user:' + request.data.user + ' | password:' + request.data.pass, 'txt');
            }
            else {
                let token = getRandomInt(100000000000).toString();
                obj.records[i].token = token;
                fs.writeFile('./users.json', JSON.stringify(obj), function (error) {
                    if (error) {

                        console.log('request.method:', request.method, '| request.url:', request.url, '| Cant write File for Error:', error.code);
                        app.write(response, { result: "Cant write File for Error: " + error.code });
                    }
                    else {
                        console.log('Login Done.', '| request.method:', request.method, '| request.url:', request.url);
                        console.log('');
                        console.log('User information.');
                        console.log('user:', request.data.user, '| password:', request.data.pass);
                        app.write(response, "Login Done." + ' | user:' + request.data.user + " | password:" + request.data.pass, 'txt', 'Token = ' + token);
                    }
                })
            }
        }
    });
});

app.start();