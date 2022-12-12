const fs = require("node:fs")

var file = fs.readFileSync("./input.txt").toString();
//var file = "mjqjpqmgbljsphdztnvjfqwrcgsmlb"
var stream = file.split("")

var last_four = []

var i = 0;
for(i; i < stream.length; i++)
{
  rcv_data(stream[i])
  if(([...new Set(last_four)].length == last_four.length ) && last_four.length == 14)break;
}

console.log(i+1)

function rcv_data(c)
{
  last_four.push(c)
  if(last_four.length > 14)
  {
    last_four.splice(0,1);
  }
}
