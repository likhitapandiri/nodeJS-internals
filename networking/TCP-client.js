const net = require("net");

const client = net.createConnection({
  host: "localhost",
  port: 3000,
});

client.on("connect", () => {
  console.log("Connected to server");

  client.write("Hello Server!");

  client.write("Hello\n");

  setTimeout(() => {
    client.write("How are you?\n");
  }, 1000);

  setTimeout(() => {
    client.write("Bye!\n");
  }, 2000);

});

client.on("data", (data) => {
  //here data is bytes, TCP only sees bytes,internally with toString node converts 
  console.log("Server says:", data.toString());
});

client.on("end", () => {
  console.log("Server disconnected");
});


//Bidirectional communication: Once connected, both client and server have a connected socket. 
// Each can independently send (write) and receive (data) bytes over the same TCP connection until one side closes it.

//TCP is a byte stream, not a message protocol. Even if you call client.write("Hello") and then client.write("World"), the receiver might get "HelloWorld" in one data event, or "Hel" and "loWorld" across multiple events.
//TCP's guarantee is:The bytes arrive in the correct order.Not:The messages arrive in the same chunks you wrote them.