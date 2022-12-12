const fs = require("node:fs")

var file = fs.readFileSync("./input.txt").toString();

const totalSpace = 70000000;
const neededSpace = 30000000;

var totalDirs = 0;

/*file = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`*/

var currentDirectory = createDirectory(false);
var root = currentDirectory;

file.split("\r\n").forEach(line => {
  //console.log()
  var args = line.split(" ")
  if(line.startsWith("$"))
  {
    if(args[1] == "cd")
    {
      //if(args[2] == "/")return;
      //console.log("newdir")
      currentDirectory = cd(currentDirectory, args[2])
    }
  }
  else
  {
    if(args[0] != "dir")
    {
      if(isNaN(parseInt(args[0])))
      {
        //console.log("REEEE")
        //console.log(line)
        return;
      }
      //console.log("newfile")
      currentDirectory[args[1]] = parseInt(args[0])
      currentDirectory["__size"] += parseInt(args[0])
      carrySizeUp(currentDirectory, parseInt(args[0]));
    }
  }
})

//console.log(root)

var targetDirs = new Set();
traverseAndFilter(root);

var total = 0;
targetDirs.forEach(item => {
  total += item["__size"];
})

console.log(total)
//console.log(root)
console.log(`Used space: ${root["__size"]}. Available Space: ${totalSpace - root["__size"]}`)

targetDirs = new Set();
var deleteDirCriterion = neededSpace - (totalSpace - root["__size"]);
console.log(`Need dir of size ${deleteDirCriterion}`)
//var totalAdded = 0;
console.log(typeof deleteDirCriterion);
traverseAndFilterTwo(root, deleteDirCriterion);
var iters = 0;
var min = totalSpace;
targetDirs.forEach(dir => {
  if(dir["__size"] < min)min = dir["__size"];
})
console.log(`Num dirs: ${totalDirs} | Times search ran: ${iters}`)
console.log(min)

function traverseAndFilter(dir)
{
  Object.keys(dir).forEach(k => {
    if(k == ".." || k == ".")return;
    if(typeof dir[k] == "number")return;
    traverseAndFilter(dir[k])
  })
  if(dir["__size"] <= 100000)targetDirs.add(dir);
}

function traverseAndFilterTwo(dir, filter)
{
  iters++;
  //console.log("Test")
  //console.log(typeof filter)
  //console.log(filter)
  Object.keys(dir).forEach(k => {
    if(k == ".." || k == ".")return;
    if(typeof dir[k] == "number")return;
    traverseAndFilterTwo(dir[k], filter)
  })
  //console.log(dir["__size"])
  if(dir["__size"] >= filter){
    targetDirs.add(dir);
    //console.log(dir)
    //console.log(dir["__size"])
    //console.log(filter)
  }
}

function carrySizeUp(dir, amt)
{
  var parent = dir[".."]
  while(parent)
  {
    parent["__size"] += amt;
    parent = parent[".."]
  }
}

4274331

function createDirectory(parent)
{
  totalDirs+=1;
  var newDir = {
    "..": parent,
    ".": this,
    "__size": 0
  }
  return newDir;
  
}

function cd(current, destination)
{
  if(!current[destination])current[destination] = createDirectory(current);
  return current[destination];
}
