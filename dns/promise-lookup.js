const dns = require("node:dns").promises;

async function resolveDomain(hostname){
  try {
    const result = await dns.lookup(hostname);
    console.log(`Address: ${result.address}`);
    console.log(`Family: IPv${result.family}`);
  } catch (err) {
    console.error("Lookup failed:", err.message);
  }
}
 function mainWithoutAsync() {
  const hostnames = [
    "google.com",
    "likhitapandiri.com",
    "abc.com",
    "amazon.com",
  ];
  for (const host of hostnames) {
    console.log("host:", host);
     resolveDomain(host);
    //const promise = resolveDomain(host);
    // You're creating the Promise...and then ignoring it.The loop doesn't wait.
  }

// "I used await inside resolveDomain(). Why are all the lookups still happening together?"
// Because you're not awaiting resolveDomain().

}

async function main() {
    const hostnames = [
      "google.com",
      "likhitapandiri.com",
      "abc.com",
      "amazon.com",
    ];
    for (const host of hostnames) {
      console.log("host:", host);
      await resolveDomain(host);
    }
}
mainWithoutAsync();
main();

//Use await only at the level where you actually need the resolved value or need to handle the error. Otherwise, return the Promise and let the caller decide when to await it.