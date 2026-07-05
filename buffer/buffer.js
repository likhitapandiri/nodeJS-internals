const { Buffer } = require("buffer");

//in Node.js, creating or writing to a standard buffer is entirely synchronous. It happens immediately and does not pause the execution of your program:

const args = process.argv.slice(2);
const command = args[0];

console.log(args);
let buf;

function alloc(){
    buf = Buffer.alloc(5);
    console.log(buf);
    console.log(buf.toString());
}

function from(){
    buf = Buffer.from("Hello");
    console.log(buf);
    console.log(buf.toString());
}

function fromArray(){
    buf = Buffer.from([65,66,67]);
    console.log(buf);
    console.log(buf.toString());
}

function concat(){
    const a = Buffer.from("Hello");
    const b = Buffer.from("World");
    buf = Buffer.concat([a,b]);
    console.log(buf);
    console.log(buf.toString());
}



function main(){
  alloc();
  from();
  fromArray();
  concat();
  console.log(buf.length);
}

main();