import http from "http";

const server = http.createServer((req, res) => {
  let body = "";
  //we can never get req.body bcoz Node doesn't know whether the body has finished arriving.

  req.on("data", (chunk) => {
    console.log("Chunk received:");

    body += chunk;

  });

  req.on("end", () => {
    // console.log("Complete body:", body);
    res.end(`server received: ${body}`);
  });
});

server.listen(3000);
