let app = require('./F1-http');

app.use('/test', function (request, response) {
    console.log('test.');

});
app.use('/sum', function (request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    write(request, result);
});

app.start();