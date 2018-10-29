// Q2. David and Thomas were in the same class and got work from their science teacher. 

// The classwork consists of N strings and each string consists of only digits. 

// The task which they need to perform is that they need to divide the string into 4 integers such that their sum is maximum.

const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
rl.prompt();

var input = [];
var input_array = "";

rl.on('line', function (data) {
    input.push(data);
    
    if(input.length > input[0]) {        
        rl.close()
    }
});

rl.on('close', function () {
    main(input)
})

function main(input) {    
    var totalCases = input[0];
    var cases = input.slice(1,input.length);
    var bound = Math.pow(10,12);
    var boundS=String(bound);
    var best = {};
    function findBest(s,off,n,sofar) {        
        var remain = s.length - off;   
        if (remain<n){ 
            return;
        }
        
        if (n==1) {        
            if (remain>13) {
                return;
            }
            if (s[off]=="0") {
                if (s.length-off>1) {
                    return;
                }
            }
            if (remain==13 && s.substr(off)!=boundS) {
                return;
            }
            
            var val = sofar + parseInt(s.substr(off));
            if (val>best.value){
                best.value = val ;     
            }
            return;  
        }
        if (s[off]=="0"){        
            findBest(s,off+1,n-1,sofar);
            return;
        }
    
        var range = Array.from(new Array(Math.min(13,remain-n+1)), function(x,i){ 
            return i + 1
        });  
        range.map(function(i) {
            findBest(s,off+i,n-1,sofar+parseInt(s.substring(off,off + i)))
        })
        if (remain-n+1>=13) {        
            if (s.substr(off,off+13)==boundS) {
                findBest(s,off+13,n-1,sofar+bound)
            }
        }
    }
    cases.map(function(s) {
        best.value=-1;
        findBest(s,0,4,0)
        console.log('------ answer for '+ s +' ---------')
        if (best.value>=0){
            console.log(best.value)
        }
        else { 
            console.log("badluck")
        }
    })
}

