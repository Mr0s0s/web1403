let use = require('./B4-cmd.js');

use.a("minus", function (contInputs) {
    console.log({ result: use.parseInputs(contInputs[1]) - use.parseInputs(contInputs[2]) });
});
use.a("sum", function (contInputs) {
    console.log({ result: use.parseInputs(contInputs[1]) + use.parseInputs(contInputs[2]) });
});
use.a("multiply", function (contInputs) {
    console.log({ result: use.parseInputs(contInputs[1]) * use.parseInputs(contInputs[2]) });
});
use.a("div", function (contInputs) {
    console.log({ result: use.parseInputs(contInputs[1]) / use.parseInputs(contInputs[2]) });
});
use.a("tavan", function (contInputs) {
    console.log({ result: use.parseInputs(contInputs[1]) ** use.parseInputs(contInputs[2]) });
});

use.a("print", function (contInputs) {
    console.log({
        name: contInputs[1],
        family: contInputs[2],
        age: (use.parseInputs(contInputs[3])),
        email: contInputs[4] + '@gmail.com'
    });
});

use.start();