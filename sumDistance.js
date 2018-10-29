const readline = require('readline');
process.stdin.setEncoding('utf-8');

const rl = readline.createInterface({input: process.stdin, output: process.stdout});
rl.prompt();

var input = [];

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
    var totalPoints = input[0];
    var points = input.slice(1,input.length);    
    var x = [] 
    var y = [] 

    points.map(function(coordinates) {
        coordinates = coordinates.split(' ');
        let x_coord = parseFloat(coordinates[0]);                                                                                                                                                                                                                                                                           
        let y_coord = parseFloat(coordinates[1]);                                                                                                                                                                                                                                                                           
        if(x_coord && y_coord) {
            x.push(x_coord)
            y.push(y_coord)
        }
    })

    var answer = finalSum(x, y)%(Math.pow(10,9)+7) // modulo 10^9 + 7
    console.log('------ answer ---------')
    console.log(answer)

    function pointSum(arr) {
        arr = arr.sort(function(a,b){
            return a - b
        });

        var res = 0;
        var sum = 0;

        arr.map(function(x,index) {
            res += (x*index - sum)
            sum += x
        })

        return res
    }

    function finalSum(x , y) {
        return pointSum(x) + pointSum(y)
    }
}