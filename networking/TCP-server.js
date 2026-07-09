const net=require("net"); //built in TCP networking module 

//JS itself cant talk to OS and create TCP connection 
//net module is Node's JavaScript API for working with TCP sockets.
//JavaScript has no built-in syntax like:createSocket();bind();listen();accept();  Those are operating system operations.
//he net module exposes a JavaScript API. Behind that API, Node's C++ implementation uses libuv, which invokes the operating system's native socket APIs (such as socket, bind, listen, accept, send, and recv on POSIX systems, or the equivalent Winsock APIs on Windows). 
// The OS then performs the actual networking using its TCP/IP stack.
const server = net.createServer((socket)=>{
    console.log("client connected");

    socket.write("Welcome to my TCP server!\n");

    // socket.end(()=>{
    //   console.log("disconnected socket");
    // });
}); //Creates a TCP server.Nothing is listening yet.

//Each socket represents one client connection.
//Create a TCP socket , Configure it as a server socket , Return a JavaScript object

server.listen(3000,()=>{
  //Bind this server to port 3000 and start accepting incoming TCP connections.
  console.log("server listening on port 3000");
})//Bind this socket to port 3000 , Start listening , Notify me when someone connects
//The operating system is the one actually monitoring port 3000.



//This is the foundation on which higher-level protocols like HTTP are built

// Suppose a client connects.The OS detects this first.
// The OS notifies Node (through libuv) that a new connection is ready.


//When you write socket.write("Hello");Node roughly does:
// JavaScript string => Convert to bytes => Ask OS to send bytes => OS TCP stack => Network
// You're not directly sending packets yourself. The OS handles segmentation, retransmissions, acknowledgments, congestion control, and everything else that TCP requires.