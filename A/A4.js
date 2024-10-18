let input=[];
input = process.argv.slice(2);
let commend=[0];
let functions= {
    sum: function sum(num1 , num2) {
        return parseInt(num1) + parseInt(num2)
    } ,
    multiple: function multiple(num1 , num2) {
        return parseInt(num1) * parseInt(num2)
    }}
    console.log(functions[commmand](input[1] , input[2]));