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
cmd.use("printRecord", function(contInputs){
    console.log({
        name: contInputs[1],
        family: contInputs[2],
        age: contInputs[3],
        email: contInputs[4]
    });
});



cmd.use("sr", function(contInputs){
    fs.writeFile('myDatabase.txt', contInputs[1], {encoding:'utf8'}, function(error){
        if(error){
            console.log('ERROR:', error);
        }
        else{
            console.log('File Saved.')
        }
    })
});

cmd.use("sr2", function(contInputs){
    let z = {
        ek: contInputs[1],
        do: contInputs[2],
        sa: contInputs[3],
        chahr: contInputs[4]
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