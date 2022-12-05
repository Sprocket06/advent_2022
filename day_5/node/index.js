const fs = require("node:fs")

var file = fs.readFileSync("c:/Users/sprocket/source/advent_2022/day_5/input.txt").toString();

var testFile = `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
`

file = file.split("\r\n");

var rows = file.slice(0, file.indexOf(""));
var numCols = parseInt(rows.pop().trim().slice(-1));
//console.log(rows)
//console.log(numCols)

var stacks = []

for(var i = 0; i < numCols; i++)stacks.push([]);

for(var y = rows.length-1; y >= 0; y--)
{
  for(var x = 0; x < numCols; x++)
  {
    var box = rows[y].slice(4*x, (4*x)+3);
    if(box == "   ")continue;
    stacks[x].push(box);
    //console.log(rows[y])
  }
}

var commands = file.slice(file.indexOf("")+1);

commands.forEach(cmd => {
  if(cmd == "")return;
  var parsedCmd = cmd.match(/move (\d+) from (\d+) to (\d+)/);
  var numBoxes = parseInt(parsedCmd[1])
  , fromStack = parseInt(parsedCmd[2])
  , toStack = parseInt(parsedCmd[3])

  var removed = stacks[fromStack-1].splice(-1 * numBoxes, numBoxes);
  stacks[toStack-1].push(...removed);
})

var out = ""
stacks.forEach(stack => out+=stack.pop())
console.log(out)
