const fs = require("node:fs")

var file = fs.readFileSync("./input.txt").toString();

file = `30373
25512
65332
33549
35390
`

var lines = file.split("\n").filter(_=>_!='');
//console.log(lines)
var grid = []
var treeScores = []
var gridWidth = lines[0].length;
var gridHeight = lines.length;

lines.forEach(line => grid.push(line.split("").map(_=>parseInt(_))));
//console.log(grid)
var numVisibile = 0;
for(var y = 0; y < gridHeight; y++)
{
  for(var x = 0; x < gridWidth; x++)
  {
    if(checkVis(x,y))numVisibile++;
  }
}

console.log(numVisibile);

var max = 0;
treeScores.forEach(s => (s>max)?max=s:false);

console.log(max);

function checkVis(x, y)
{
  if(x == 0 || x == (gridWidth-1))return true;
  if(y == 0 || y == (gridHeight-1))return true;
  var visibility = [true, true, true, true]
  var treeHeight = grid[y][x];
  var cY = y,
      cX = x;
  var scores = [0, 0, 0 ,0];
  //check north
  while(cY > 0)
  {
    cY--;
    scores[0]++
    if(grid[cY][cX] >= treeHeight)
    {
      visibility[0] = false;
      break;
    }
  }

  //check south
  cY = y;
  while(cY < gridHeight-1)
  {
    cY++;
    scores[1]++;
    if(grid[cY][cX] >= treeHeight)
    {
      visibility[1] = false;
      break;
    }
  }
  
  //check west
  cY = y;
  while(cX > 0)
  {
    cX--;
    scores[2]++;
    if(grid[cY][cX] >= treeHeight)
    {
      visibility[2] = false;
      break;
    }
  }

  //check check east
  cX = x;
  while(cX < gridWidth-1)
  {
    cX++;
    scores[3]++;
    if(grid[cY][cX] >= treeHeight)
    {
      visibility[3] = false;
      break;
    }
  }

  treeScores.push( scores[0] * scores[1] * scores[2] * scores[3] )
  return visibility.includes(true);
}
