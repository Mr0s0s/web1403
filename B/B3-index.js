let index = require('./B3-cmd.js');

index.a("minus", function(a, b){
    return a - b
});
index.a("sum", function(a, b){
    return a + b
});
index.a("multiply", function(a, b){
    return a * b
});
index.a("div", function(a, b){
    return a / b
});
index.start();