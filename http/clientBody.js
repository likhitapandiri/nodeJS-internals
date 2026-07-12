import http from "http";

const users = [];


for (let i = 0; i < 10000; i++) {
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
    console.log(res.statusCode);
    console.log(res.headers);
    res.resume();
    let respData="";
    res.on("data", (chunk) => {
       respData+=chunk;
       console.log("chunk recived");
    });

    res.on("end",()=>{
        console.log("response recived");
    })
  },
);

for (let i = 0; i < json.length; i += 5) {
  req.write(json.slice(i, i + 5));
}

req.end();
