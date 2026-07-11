const dgram = require("dgram");
const readline = require("readline");

const client = dgram.createSocket("udp4");

const SERVER_PORT = 4000;
const SERVER_HOST = "localhost";

client.bind(() => {
  // Register with server
  client.send(Buffer.from("Joined the chat"), SERVER_PORT, SERVER_HOST);
});

client.on("message", (msg, rinfo) => {
  console.log(`Message : ${msg.toString()}`);
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function prompt() {
  rl.question("> ", (message) => {
    client.send(Buffer.from(message), SERVER_PORT, SERVER_HOST);

    prompt();
  });
}

prompt();
