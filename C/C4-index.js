const { Console } = require('console');
let cmd = require('./C1-cmd.js');
let fs = require('fs');

cmd.use("minus", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) - cmd.parseInput(contInputs[2]));
});
cmd.use("sum", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) + cmd.parseInput(contInputs[2]));
});
cmd.use("multiply", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) * cmd.parseInput(contInputs[2]));
});
cmd.use("div", function(contInputs){
    console.log(cmd.parseInput(contInputs[1]) / cmd.parseInput(contInputs[2]));
});
cmd.use("print", function(contInputs){
    console.log({
        Name: contInputs[1],
        Family: contInputs[2],
        Age: contInputs[3],
        Email: contInputs[4]
    });
});


cmd.use("save", function(contInputs){
    fs.writeFile('myDatabase.txt', contInputs[1], {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});

cmd.use("save2", function(contInputs){
    let z = {
        one: contInputs[1],
        two: contInputs[2],
        three : contInputs[3],
        four: contInputs[4]
    }
    z = JSON.stringify(z)
    fs.writeFile('myDatabase.txt',z, {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});



cmd.use("openfile", function(contInputs){
    fs.readFile(contInputs[1], function(error , data){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File open.',data.toString())
        }
    })
});



cmd.use("open", function(contInputs){
    fs.readFile(contInputs[1], function(error , data){
        if(error){
            if(error.code === 'ENOENT'){
                
                console.log('ENOENT ERROR');
            }
            else if(error.code === 'EISDIR'){
                fs.readdir(contInputs[1], function(errorr , dataa){
                    if(errorr){

                    }
                    else{
                        console.log("file drsta",dataa);
                    }
                })
                console.log('EISDER ERROR');
            }
            else{
                console.log('oder error',error);
            }
        }
        else{
            console.log('File open.',data.toString())
        }
    })
});

cmd.start();