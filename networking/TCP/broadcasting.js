
const net = require("net");
const clients = [];

const server = net.createServer((socket)=>{
    console.log(
      `client connected : ${socket.remoteAddress}:${socket.remotePort}`,
    );
    clients.push(socket);

    socket.write("Welcome to my TCP server!\n");

    socket.on("data",(data)=>{
      console.log("client says:",data.toString());
      socket.write(`Server recieved : ${data}`);

      for(const client of clients){
        if(client!== socket){
            client.write(`Broadcasting data: ${data}`);
        }
      }
    })

    // socket.end(()=>{
    //   console.log("disconnected socket");
    // });
}); 

server.listen(3000, () => {
  console.log("server listening on port 3000");
});

//A listening socket accepts many clients without being replaced.
//Each client connection gets its own independent connected socket.
//Node handles many sockets concurrently through the event loop rather than one thread per connection.
//A server can act as a central message router, receiving data from one client and forwarding it to one or many others. This "hub" architecture is the foundation of chat applications, multiplayer games, collaborative editors, and technologies like Socket.IO.