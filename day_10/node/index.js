const fs = require("node:fs")

var file = fs.readFileSync("./input.txt").toString();

var lines = file.split("\r\n").filter(_=>_!='')
var currInstruction = 0;

var instruction = parseInstr(lines[0]);
var timer = 1;
var X = 1;

const logAt = [20,60,100,140,180,220];
var log = []

var out = "";

for(var i = 0; i < 240; i++)
{
  //console.log(i)
  //instruction = nextInstr();
  if(instruction[0] == "noop")
  {
    drawNextPixel(i);
    instruction = nextInstr();
  }
  else
  {
    drawNextPixel(i);
    i+=1;
    drawNextPixel(i)
    //console.log(instruction[1])
    X += instruction[1]
    instruction = nextInstr();
  }
  
}

//console.log(log.reduce((a,b)=> a+b))
console.log(out)

function drawNextPixel(cycle)
{
  console.log(`Current cycle: ${cycle}
Current CRT position: ${cycle % 40}
Current X register: ${X}
Drawing this frame?:  ${(X-1) <= (cycle % 40) && (X+1) >= (cycle % 40)} `)
  var currentX = cycle % 40;
  //console.log(currentX)
  if(currentX == 0)
  {
    //console.log("newline")
    out += "\n"
  }
  //console.log(X)
  if( (X-1) <= currentX && (X+1) >= currentX )
  {
    out += "#"
  }else out += ".";
}
function nextInstr()
{
  currInstruction++;
  return parseInstr(lines[currInstruction]);
}

function parseInstr(i)
{
  if(!i)return "noop"
  i = i.split(" ");
  if(i[0] == "addx")
  {
    i[1] = parseInt(i[1]);
  }
  return i;
}
