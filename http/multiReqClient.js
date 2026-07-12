//Different URLs

//but not differnet http connection and request() obj if ends request is finished forever. ,eans TCP connection ended

//One TCP connection
//A TCP connection can carry multiple HTTP requests (HTTP/1.1 keep-alive).uses same TCP socket

import http from "http";

const agent = new http.Agent({
  keepAlive: true,
});

function makeRequest(path) {
  const req = http.request(
    {
      hostname: "localhost",
      port: 3000,
      path,
      agent,
    },
    (res) => {
      res.on("data", (chunk) => {
        console.log(chunk.toString());
      });
    }
  );

  req.end();
}

makeRequest("/");
makeRequest("/about");
makeRequest("/users");

//in this doesn't HTTP/1.1 send them on one connection?
// Request: GET / from ::ffff:127.0.0.1:54396
// Request: GET /about from ::ffff:127.0.0.1:54400
// Request: GET /users from ::ffff:127.0.0.1:54404
// server got client port diff  even with alive connection becoz 1.1 cannot process multiple reqs simultaneously on the same connection coz the socket is not idel to send the second req on the same socket 
//so immediately as second req is getting called it creates new TCP connection