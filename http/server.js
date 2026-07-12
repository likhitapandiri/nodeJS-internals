import http from "http";

const server = http.createServer((req,res)=>{
    console.log(
      `Request: ${req.method} ${req.url} from ${req.socket.remoteAddress}:${req.socket.remotePort}`,
    );
    res.end("Hello");
})

server.listen(3000,()=>{
    console.log("server listening at port 3000");
});
