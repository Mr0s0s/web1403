input = [];
input = process.argv.slice(2);

function sum(num1, num2) {
    return parseInt(num1) + parseInt(num2);
}
function multiply(num1, num2) {
    return parseInt(num1) * parseInt(num2);
}

/*
function minus (num1,num2) {
return parseInt(num1) - parseInt(num2);
}
function div (num1,num2) {
return parseInt(num1) / parseInt(num2);
}
*/

let command = {
    "sum": sum,
    "multiply": multiply

    /*
    ,"minus":minus,
    "div":div
    */

}
console.log(command[input[0]](input[1], input[2]));