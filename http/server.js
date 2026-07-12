import http from "http";

const server = http.createServer((req,res)=>{
  console.log(
    `Request: ${req.method} ${req.url} from ${req.socket.remoteAddress}:${req.socket.remotePort}`,
  );
  //not only urls http is also about methods - which describe the action the client wants to perform on the resource
  if (req.method === "GET") {
    res.end(`GET : ${req.url}`);
  } else if (req.method === "POST") {
    res.end(`POST: ${req.url}`);
  } else {
    res.statusCode = 405;
    res.end("Method Not Allowed");
  }
})

server.listen(3000,()=>{
    console.log("server listening at port 3000");
});
