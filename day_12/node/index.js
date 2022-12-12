const fs = require("node:fs")

var file = fs.readFileSync("./input.txt").toString();

/*file = `Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
`*/

var lines = file.split("\n").filter(_=>_!='');

//console.log(lines)
var map = []
var elevations = `abcdefghijklmnopqrstuvwxyz`.split``
var startPos, endPos;
var gridWidth = lines[0].length;
var gridHeight = lines.length;

grid = lines.map((l, y) => l.split("").map((c,x) => {
  var elevation = 0;
  if(c == "S")
  {
    startPos = [x, y];
  }
  else if(c == "E")
  {
    endPos = [x, y]
    elevation = 25
  }
  else
  {
    elevation = elevations.indexOf(c)
  }
  return {
    elevation,
    order: 0,
    visited: false
  }
}))

function shortestPathToExit(sX, sY)
{

  grid.forEach(row => row.forEach(node => {node.order=0; node.visited=false;}));

  
  var current = [[sX, sY]]
  var done = false;
  var iter = 1;
  var reachable = []

  while(!done)
  {

    current.forEach(pos => {
      reachable.push(...getReachable(...pos))
    })

    reachable = dedupe(reachable);
    reachable.forEach(pos => {
      grid[pos[1]][pos[0]].visited = true;
      grid[pos[1]][pos[0]].order = iter;
      if(pos[0] == endPos[0] && pos[1] == endPos[1])
      {
        done = true;
      }
    })

    if(done)break;
    
    if(reachable.length == 0)
    {
      return 9999;
    }

    if(iter > 473)break;
    
    iter++;
    current = reachable;
    reachable = [];
  }
  return iter;
}

console.log("PART A")
console.log(shortestPathToExit(startPos[0], startPos[1]))

console.log("PART B")
var potentialStarts = [];
grid.forEach((row, y) => row.forEach((node, x) => node.elevation == 0 ? potentialStarts.push([x,y]):false))

//console.log(potentialStarts)

potentialStarts = potentialStarts.map(_=> shortestPathToExit(_[0], _[1]))

console.log(Math.min(...potentialStarts))

function dedupe(arr)
{
  return arr.filter((vec, i) => arr.findIndex(it => it[0] == vec[0] && it[1] == vec[1]) == i);
}

function getReachable(x,y)
{
  var reachable = []
  var n;
  var cEl = grid[y][x].elevation;
  var can_reach = (c,n) => c >= (n-1);
  if((y+1) < gridHeight)
  {
    n = grid[y+1][x];
    if(n.visited == false && can_reach(cEl, n.elevation))
    {
      reachable.push([x, y+1])
    }
  }
  if((y-1) >= 0)
  {
    n = grid[y-1][x]
    if(n.visited == false && can_reach(cEl, n.elevation))
    {
      reachable.push([x, y-1])
    }
  }
  if((x+1) < gridWidth)
  {
    n = grid[y][x+1]
    if(n.visited == false&& can_reach(cEl, n.elevation))
    {
      reachable.push([x+1, y])
    }
  }
  if((x-1) >= 0)
  {
    n = grid[y][x-1]
    if(n.visited == false&& can_reach(cEl, n.elevation))
    {
      reachable.push([x-1, y])
    }
  }
  return reachable;
}
