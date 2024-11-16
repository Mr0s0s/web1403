let app = require('./F2-http');

app.use('/test', function (request, response) {
    result = {
        data: request.url
    }
    console.log(request.method, request.url);
    app.write(response, result)
});

app.use('/sum', function (request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result)
});

app.use('/multiply', function (request, response) {
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    console.log('request.method:', request.method, '| request.url:', request.url, '| result.data:', result.data);
    app.write(response, result);
});

app.use('/print', function (request, response) {
    result = {
        "One": request.path[2],
        "Two": request.path[3],
        "Three": request.path[4]
    }
    console.log('request.method:', request.method, '| request.url:', request.url);
    app.write(response, result);
});

app.start();