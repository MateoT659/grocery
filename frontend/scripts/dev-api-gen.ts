import { execSync } from "child_process";
import fs from "fs";

let output;
let ip;
const platform = process.platform;
try {
  if (platform.indexOf("win") === 0) {
    output = execSync('ipconfig | findstr -i \"ipv4\"').toString();
    ip = output
      .split("\n")
      ?.filter((line) => line.includes("IPv4 Address"))
      .findLast(() => true)
      ?.match(/\d+\.\d+\.\d+\.\d+/)?.[0] ?? ["localhost"];
    console.log("Detected Windows OS.");
  } else {
    output = execSync('ifconfig | grep "inet "').toString();
    ip = (
      output.slice(20).match(/\d+\.\d+\.\d+\.\d+/) ?? ["localhost"]
    ).findLast(() => true);
    console.log("Detected Unix-based OS.");
  }
} catch (e) {
  console.warn(
    "Failed to retrieve IP configuration: .apiconfig.json file not generated. Error:",
    e,
  );
  ip = "localhost";
}

const envString = `{\"DEV_API_HOSTURL\":\"http://${ip}:8080\"}`;

fs.writeFileSync(".apiconfig.json", envString);
console.log("Local .apiconfig.json file generated successfully.");
