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

  for(let i=0;i<1000;i++){
    client.write(`message ${i}\n`);
    //write() and data are not one-to-one. TCP is a continuous stream of bytes, 
    // and it's the application's responsibility to define and detect message boundaries.

    //Because TCP only guarantees: "I'll deliver the bytes in order."
    //It does not guarantee: "I'll preserve each write() as a separate message."
  }

  //Server says: Welcome to my TCP server!
// Hello Server!
// Server says: Hello
// message 0
// message 1
// message 2
// message 3
// message 4
// message 5

// Server says: message 6
// message 7
// message 8
// message 9
// message 10
// message 11
// message 12
// message 13
// message 14

//this is how the resp looked like 
//if each req or each write is one to one then every line should be server says: message {i}
//it just deliver bytes in order but not induvidual
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