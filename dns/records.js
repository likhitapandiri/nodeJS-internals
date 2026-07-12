
//lookup uses operating system resolver ,Uses the OS DNS cache and configuration.

//dns.resolve(), resolve4(), resolveMx(), etc.not through the OS resolver.
//The difference is who is doing the work.
//Node itself performs the DNS protocol.It does not call the OS's getaddrinfo().
//ultimately uses the OS to send network packets.Because every application uses the OS for networking.

//But the DNS resolution logic is not performed by the OS.

// Instead:

// Node (via c-ares) builds the DNS packet.
// Node asks the OS to send that UDP packet.
// The OS sends it.
// The DNS server replies.
// Node parses the DNS response.


const dns = require("dns").promises;

const domain = process.argv[2];

if(!domain){
    console.log("Usage: node records.js google.com");
    process.exit();
}

async function printRecord(title,fn){
    try{
        const records = await fn();
        console.log(`\n${title}`);

        if(records.length === 0){
            console.log("None");
            return;
        }

        records.forEach(record => {
            console.log(record);
        });
    }
    catch(err){
        console.log(`\n${title}`);
        console.log("not found");
    }
}

async function main(){
  console.log("==============================");
  console.log("DNS RECORD LOOKUP");
  console.log("==============================");
  console.log("Domain:", domain);

  await printRecord("A Records", () => dns.resolve4(domain)); //(IPv4 address)

  await printRecord("AAAA Records", () => dns.resolve6(domain)); //(IPv6 address)

  await printRecord("MX Records", () => dns.resolveMx(domain)); //(Mail servers)

  await printRecord("NS Records", () => dns.resolveNs(domain)); //(Name servers)

  await printRecord("TXT Records", () => dns.resolveTxt(domain)); //(Verification/SPF records)

  await printRecord("CNAME Records", () => dns.resolveCname(domain)); //(Aliases)
}

main();