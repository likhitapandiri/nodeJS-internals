const dgram = require("dgram"); //built in UDP networking module , not net bcoz udp uses datagram not streams 

const server = dgram.createSocket("udp4");

server.on("message", (msg, rinfo) => {
  console.log("Message:", msg.toString());

  console.log("From:", rinfo.address, rinfo.port);
});

server.bind(4000, () => {
  console.log("UDP Server listening");
});


// With UDP:
// ❌ No handshake
// ❌ No connection
// ❌ No socket per client
// ❌ No sequence numbers
// ❌ No ACKs
// ❌ No retransmissions

// Instead it's simply:
// "Here's a packet. Deliver it if you can."

//TCP is like phone call
//UDP is like postcard - drop it box ,no confirmation ,u just send it
