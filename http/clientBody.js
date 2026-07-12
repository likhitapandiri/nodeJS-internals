import http from "http";

const data ="John";


const req = http.request(
  {
    hostname: "localhost",
    port: 3000,
    path: "/users",
    method: "POST",
  },
  (res) => {
    res.resume();
    res.on("data", (chunk) => {
      console.log(chunk.toString());
    });
  },
);

for(let i=0;i<100;i+=1){
req.write(`${i}:${data}\n`);
}

req.end();
