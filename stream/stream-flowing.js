const fs = require("fs");

// const stream = fs.createReadStream("notes.txt");
const stream = fs.createReadStream("notes.txt", {
  highWaterMark: 20, //20 bytes 
});
// We didn't read anything yet. We only created the machine.
// console.log(stream);


//open file 
stream.on("open", () => {
  console.log("File opened");
}); //The stream is now connected to its source.


//data 
//whenever node recieves another chunk it sends as data event 
stream.on("data",(chunk)=>{
    console.log("chunk:",chunk);
    console.log("chunkString:",chunk.toString());

})


//end 
stream.on("end", () => {
  console.log("Finished!");
});

//close - source close after finsihed 
stream.on("close", () => {
  console.log("Closed");
});

//err
stream.on("error", (err) => {
  console.log(err.message);
});