let inputs = process.argv.slice(2);
let commend = inputs[0];


let control = [
    {
        name: "sum",
        ciled: function sum(a, b) {
            return parseInt(a) + parseInt(b);
        }
    },
    {
        name: "multiply",
        ciled: function multiply(a, b) {
            return parseInt(a) * parseInt(b);
        }
    },
    {
        name: "minus",
        ciled: function minus(a, b) {
            return parseInt(a) - parseInt(b);
        }
    },
    {
        name: "div",
        ciled: function div(a, b) {
            return parseInt(a) / parseInt(b);
        }
    }
];

control.forEach(function (item) {
    if (commend === item.name) {
        console.log(item.ciled(inputs[1], inputs[2]));
    }
});