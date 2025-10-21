import { execSync } from 'child_process';
import fs from 'fs';
console.log("Generating DTO files...");

if(!fs.existsSync('build')){
    fs.mkdirSync('build');
}

execSync('npx openapi-typescript http://localhost:8080/v3/api-docs -o ./build/api_dto.d.ts --default-non-nullable')