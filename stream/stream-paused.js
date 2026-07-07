const fs = require("fs");

const stream = fs.createReadStream("notes.txt");

stream.on("readable", () => {
  console.log("Some data is available!");

  let chunk;

  while ((chunk = stream.read()) !== null) {
    console.log("Chunk:", chunk.toString());
  }
});

stream.on("end", () => {
  console.log("Finished");
});
