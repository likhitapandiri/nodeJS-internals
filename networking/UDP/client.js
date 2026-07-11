const dgram = require("dgram");

const client = dgram.createSocket("udp4");

client.send("Hello UDP", 4000, "localhost", () => {
  console.log("Sent!");
});

client.send("First", 4000, "localhost", () => {
  console.log("Sent!");
});

client.send("Second", 4000, "localhost", () => {
  console.log("Sent!");
});

client.send("Third", 4000, "localhost", () => {
  console.log("Sent!");
});



//datagram - each send is one complete packet - unlike bytestream- it can be divided into smaller packects

//there is no connect() ,you just simply send 