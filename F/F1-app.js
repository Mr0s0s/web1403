let app = require('./F1-http');

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

app.start();