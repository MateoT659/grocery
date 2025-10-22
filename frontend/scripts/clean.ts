import fs from 'fs';

console.log("Cleaning build artifacts...");

if(fs.existsSync('build')){
    fs.rmSync('build', { recursive: true, force: true });
}