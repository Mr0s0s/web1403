const { error } = require('console');
let app = require('./F4-http');
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

app.use('/save', function (request, response) {
    let x = {
        One: request.path[2],
        Two: request.path[3],
        Three: request.path[4]
    }
    fs.writeFile('save.txt', JSON.stringify(x), function (error, data) {
        if (error) {
            write(response, { result: "Cant File Save." });
        }
        else {
            write(response, { result: "File Save." })
        }
    })
});

app.use("/open", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            console.log(error);

        } else {
            result = data.toString()
            write(response, result)
        }
    })
})

app.use("/saveOBJ", function (request, response) {
    fs.readFile(request.path[2], function (error, data) {
        if (error) {
            console.log("ERROR: ", error.code);
        }
        else {
            let getData = data.toString()
            getData = JSON.parse(getData)
            let newOBJ = {
                name: request.path[3],
                family: request.path[4],
                email: request.path[5]
            }
            getData.data.push(newOBJ)
            fs.writeFile(request.path[2], JSON.stringify(getData), function (err) {
                if (err) {
                    console.log(err);

                } else {
                    result = "Save Change"
                    write(response, result)
                }
            })
        }
    })
})

app.use('/writeFile', function (request, response) {
    fs.writeFile(request.data.name, request.data.content, "utf8", function (error) {
        if (error) {
            console.log(error);
            write(response, " ERROR")
        } else {
            console.log("File Saved.");
            write(response, "File Saved.")
        }
    })
})

function write(res, result) {
    if (typeof result === "number") {
        result = result.toString()
    }
    res.write(result)
    res.end()
}

app.start();