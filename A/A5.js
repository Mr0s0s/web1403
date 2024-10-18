let input = Process.argv.slice(2);
let commend = input[0];
let control = [];
console.log('minus','sum','multiply')
function parseInt(input){
    return parseInt(input);
}
function addcontrol(name,func){
    let x = {
        commend:name,function:func
    };
    control.push(x)
;}

addcontrol("minus",function(a,b){
    return a-b;
});
addcontrol("sum",function(a,b){
    return a+b;
});
addcontrol("multiply",function(a,b){
    return a*b;
});

for(let itam of control){
    if(itam.commend === commend){
        console.log(itam.function(parseInput(input[1]),parseInput(input[2])));
    }
}