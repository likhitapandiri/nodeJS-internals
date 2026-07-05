const fs = require("fs");

console.log("Before");
let data;
try{
data = fs.readFileSync("notes.txt", "utf8");
console.log(data);
}catch(e){
console.log(e.message);
}

try {
  data = fs.readFileSync("README.md", "utf8");
  console.log(data);
} catch (e) {
  console.log(e.message);
}

console.log("After");

//The JavaScript thread is blocked until the file is completely read.
