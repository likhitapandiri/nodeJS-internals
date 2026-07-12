const dns = require("dns");
const ip=process.argv[2];

if(!ip){
    console.log("ip no given");
    process.exit();
}

dns.reverse(ip,(err,hostnames)=>{
    if(err){
        console.log(err.message);
        return;
    }
    console.log("IP:",ip);
    console.log("Domains:");
    hostnames.forEach(host => console.log("-",host));
})

//node reverse-lookup.js 8.8.8.8