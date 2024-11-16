let app = require('./F1-http');

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

app.start();