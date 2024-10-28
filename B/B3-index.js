let a = require('./B3-cmd.js');

a.ww("minus", function(a, b){
    return a - b
});
a.ww("sum", function(a, b){
    return a + b
});
a.ww("multiply", function(a, b){
    return a * b
});
a.ww("div", function(a, b){
    return a / b
});
a.startt();