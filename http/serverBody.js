import http from "http";

const server = http.createServer((req, res) => {
  let body = "";
  //we can never get req.body bcoz Node doesn't know whether the body has finished arriving.

  req.on("data", (chunk) => {
    console.log("Chunk received:", chunk.toString());

    body += chunk;

//  695,"name":"John"},{"id":998696,"name":"John"},{"id":998697,"name":"John"},{"id":998698,"name":"John"},{"id":998699,"name":"John"},{"id":998700,"name":"John"},{"id":998701,"name":"John"},{"id":998702,"nam
// Chunk received: e":"John"},{"id":998703,"name":"John"},{"id":998704,"name":"John"},{"id":998705,"name":"John"},{"id":998706,"name":"John"},{"id":998707,"name":"John"},{"id":998708,"name":"John"},{"id":998709,

//u can see here u got another log of chunk recived which starts with e bcoz the name is in previous chunk 
  });

  req.on("end", () => {
    // console.log("Complete body:", body);
    res.end("server received");
  });
});

server.listen(3000);
