//Different URLs

//but not differnet http connection and request() obj if ends request is finished forever. ,eans TCP connection ended

//One TCP connection
//A TCP connection can carry multiple HTTP requests (HTTP/1.1 keep-alive).uses same TCP socket

import http from "http";

const agent = new http.Agent({
  keepAlive: true,
});

function makeRequest(path,method) {
    return new Promise((resolve) => {
      const req = http.request(
        {
          hostname: "localhost",
          port: 3000,
          method: method,
          path,
          agent,
        },
        (res) => {
          console.log("Status:", res.statusCode);
          console.log("Headers:", res.headers);
          res.on("data", (chunk) => {
            console.log(chunk.toString());
          });

          res.on("end", () => {
            console.log("Finished", path);
            resolve();
          });
        },
      );
      req.end();
    });
}

// makeRequest("/");
// makeRequest("/about");
// makeRequest("/users");

//in this doesn't HTTP/1.1 send them on one connection?
// Request: GET / from ::ffff:127.0.0.1:54396
// Request: GET /about from ::ffff:127.0.0.1:54400
// Request: GET /users from ::ffff:127.0.0.1:54404
// server got client port diff  even with alive connection becoz 1.1 cannot process multiple reqs simultaneously on the same connection coz the socket is not idel to send the second req on the same socket 
//so immediately as second req is getting called it creates new TCP connection


(async ()=>{
    const path1 = "/?id=15&sort=name";
    const path2 = "/about?id=15&sort=name";
    const path3 = "/users?id=15&sort=name";

    await makeRequest(path1, "GET");
    await makeRequest(path2, "GET");
    await makeRequest(path3, "GET");
    await makeRequest(path1, "POST");
    await makeRequest(path2, "POST");
    await makeRequest(path3, "POST");
    await makeRequest(path1, "PUT");
    await makeRequest(path2, "PUT");
    await makeRequest(path3, "PUT");
})();
