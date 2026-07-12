import http from "http";

const json = JSON.stringify({
  name: "John",
  age: 22,
  city: "Delhi",
});

const req = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/users",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(json),
    },
  },
  (res) => {
    res.resume();
    res.on("data", (chunk) => {
      console.log(chunk.toString());
    });
  },
);

for (let i = 0; i < json.length; i += 5) {
  req.write(json.slice(i, i + 5));
}

req.end();
