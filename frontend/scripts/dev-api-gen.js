const execSync = require('child_process').execSync;
const fs = require('fs');

//const output = execSync('ipconfig | findstr -i \"ipv4\"').toString();
const output = execSync('ifconfig | grep "inet "').toString();
let ip;
try{
    ip = output.slice(20).match(/\d+\.\d+\.\d+\.\d+/)[0];
}
catch(e){
    console.warn("Failed to retrieve IP configuration: .apiconfig.json file not generated. Error:", e);
    ip = "localhost";
}

const envString = `{\"DEV_API_HOSTURL\":\"http://${ip}:8080\"}`;

fs.writeFileSync('.apiconfig.json', envString);
console.log("Local .apiconfig.json file generated successfully.");