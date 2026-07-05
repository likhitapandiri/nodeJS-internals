const fs = require("fs/promises"); //only contains promise-based API'S
const fsSync = require("fs");

const args = process.argv.slice(2);

console.log(args);
// suppose user runs node explorer.js list

const command = args[0];
const fileName = args[1];
const text = args[2];
const renameFileName = args[2];

console.log(command);
console.log(fileName);
console.log(text);

async function list() {
console.log(fs.readdir(".")); //promise pending 
const files = await fs.readdir(".");
console.log(files);
}

async function read(){
  const data = await fs.readFile(fileName);
  console.log(data); // returns buffer
  const utfData = await fs.readFile(fileName, "utf-8");
  console.log(utfData);
}

async function create(){
    try{
  const create = await fs.writeFile(fileName,""); //creates empty file;
  console.log(create); //if file already exsists it overwrites 
    }catch(e){
        console.log(e);
    }
}

async function append() {
  const data = await fs.appendFile(fileName,text);
  console.log(data);
}

async function rename(){
    list();
    const data = await fs.rename(fileName,renameFileName);
    console.log(data);
    list();
}

async function deleteFile() {
    const data = await fs.unlink(fileName);
    console.log(data);
}

async function fileSize(){
    const data = await fs.stat(fileName);
    console.log(data);
}

async function permissions(){
    const data = await fs.stat(fileName);
    console.log(data.mode);
}

function watch(){

fsSync.watch(fileName, (eventType, filename) => {
  console.log("Something changed!");
  console.log("Event:", eventType);
  console.log("File:", filename);
});

console.log("Watching notes.txt...");
}



if (command === "list") {
  //node explorer.js list
  list();
}else if(command == 'read'){
  //node explorer.js read README.md
  read();
}else if(command == 'create'){
  //node explorer.js create notes.txt
  create();
}else if(command == 'append'){
    //node explorer.js append notes.txt "Hello"
    append();
    read();
}else if(command == 'rename'){
  //node explorer.js rename notes.txt todo.txt
  rename();
}else if(command === 'delete'){
  //node explorer.js delete todo.txt
  deleteFile();
}else if(command === 'size'){
  //node explorer.js size notes.txt
  fileSize();
}else if(command === 'permissions'){
  //node explorer.js permissions notes.txt
  permissions();
}else if(command == "watch"){
  //node explorer.js watch notes.txt
  //start the program and manually edit the notest.txt and u can see the output;
 watch();
}


