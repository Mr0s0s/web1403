let index = require('./B3-cmd.js');

index.a("minus", function (a, b) {
    return { result: index.parseInputs(a) - index.parseInputs(b) };
});
index.a("sum", function (a, b) {
    return { result: index.parseInputs(a) + index.parseInputs(b) };
});
index.a("multiply", function (a, b) {
    return { result: index.parseInputs(a) * index.parseInputs(b) };
});
index.a("div", function (a, b) {
    return { result: index.parseInputs(a) / index.parseInputs(b) };
});
index.a("tavan", function (a, b) {
    return { result: index.parseInputs(a) ** index.parseInputs(b) };
});

index.start();