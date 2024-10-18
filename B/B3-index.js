let a = require('./B3-cmd.js');

a.a("minus", function(a, b){
    return a - b
});
a.a("sum", function(a, b){
    return a + b
});
a.a("multiply", function(a, b){
    return a * b
});
a.a("div", function(a, b){
    return a / b
});
a.start();