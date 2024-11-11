let app = require('./F2-http');
let fs = require('fs')

app.use('/test', function (request, response) {
    console.log('test.')
});

app.use('/sum', function (request, response) {
    result = {
        data: parseInt(request.path[2]) + parseInt(request.path[3])
    };
    write(response, result);
});

app.use('/multiply', function (request, response) {
    result = {
        data: parseInt(request.path[2]) * parseInt(request.path[3])
    };
    write(response, result);
});

app.use('/print', function (request, response) {
    result = {
        "name": request.path[2],
        "family": request.path[3],
        "email": request.path[4]
    }
    write(response, result);
});

function write(response, result) {
    response.write(JSON.stringify(result))
    response.end()
}

app.start();