const fs = require("fs");

console.log("Before");

let data;
try {
  fs.readFile("notes.txt", "utf8", (err, data) => {
    console.log(data);
  });
} catch (e) {
  console.log(e.message);
}

try {
  fs.readFile("README.md", "utf8", (err, data) => {
    console.log(data);
  });
} catch (e) {
  console.log(e.message);
}

console.log("After");

//The JavaScript thread keeps running while the file is being read.
// Before
// After
// undefined
// # nodeJS-internals


