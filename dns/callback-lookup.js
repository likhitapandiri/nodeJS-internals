const dns = require("node:dns");
const hostnames = ["google.com", "likhitapandiri.com", "abc.com", "amazon.com"];
for (const host of hostnames) {
  console.log("host:", host);
  dns.lookup(host, (err, address, family) => {
    if (err) {
      console.error("lookup failed:", err.message);
      return;
    }
    console.log(`Address: ${address}`);
    console.log(`family: IPv${family}`);
  });
}
