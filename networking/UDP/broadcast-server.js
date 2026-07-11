// this broadcasting keeping connected clients as list is applican level broadcasting 

const dgram = require("dgram");
const server = dgram.createSocket("udp4");
const clients = new Map();

server.on("listening", () => {
  const address = server.address();

  console.log("=================================");
  console.log("UDP Broadcast Server Started");
  console.log(`Listening on ${address.address}:${address.port}`);
  console.log("=================================\n");
});

server.on("message",(msg,rinfo)=>{
    const key = `${rinfo.address}:${rinfo.port}`;
    if(!clients.has(key)){
        clients.set(key,{
            address:rinfo.address,
            port:rinfo.port,
        });
    }

    console.log(`From    : ${rinfo.address}:${rinfo.port}`);
    console.log(`Message : ${msg.toString()}`);

    for (const client of clients.values()) {
      if (client.address === rinfo.address && client.port === rinfo.port) {
        continue;
      }

      const packet = {
        from: `${rinfo.address}:${rinfo.port}`,
        message: msg.toString(),
      };

      server.send(
        Buffer.from(JSON.stringify(packet)),
        client.port,
        client.address,
      );

      server.send(msg, client.port, client.address);

      console.log(`Forwarded to ${client.address}:${client.port}`);
    }
});

server.bind(4000);