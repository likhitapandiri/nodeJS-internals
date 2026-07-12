import http from "http";

const options = {
  hostname: "localhost",
  port: 3000,
  path: "/",
  method: "GET",
};

const req = http.request(options, (res) => {
  console.log("Status:", res.statusCode);
  console.log("Headers:", res.headers);

  res.on("data", (chunk) => {
    console.log("Body:", chunk.toString());
  });

  res.on("end", () => {
    console.log("Response finished");
  });
});

req.on("error", (err) => {
  console.error(err);
});

req.end(); // Actually sends the request

//as HTTP is built on TCP - where data is in stream
//The res object is readable stream - it naturally has events like "data","end","error" because that's how all readable streams work.

//Why are statusCode and headers available immediately, but not the body?
// An HTTP response looks like this:

// HTTP/1.1 200 OK
// Content-Type: text/plain
// Content-Length: 11
// Hello World

//The first part of the response is very small.
// HTTP/1.1 200 OK
// Content-Type: text/plain
// Content-Length: 11

// Node can parse this almost immediately after receiving the beginning of the response.
//Imagine the body is 2 GB.Node cannot do res.body because it doesn't even have the complete body yet.It is still arriving over TCP.
