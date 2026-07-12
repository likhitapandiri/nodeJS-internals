import http from "http";

const users = [];

for (let i = 0; i < 1000000; i++) {
  users.push({
    id: i,
    name: "John",
  });
}

const json = JSON.stringify(users);

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

req.write(json);

req.end();
