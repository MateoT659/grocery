import fs from 'fs';

console.log("Generating API interface types...");

const file = './build/api_dto.d.ts';

if(!fs.existsSync(file)){
  process.exit(1);
}

const content = fs.readFileSync(file, 'utf-8');
// Find the start of 'export interface components'
const schemasStart = content.indexOf('schemas: {');

if (schemasStart === -1) {
  console.log('No schemas found.');
  process.exit(0);
}

let braceCount = 0;
let i = content.indexOf('{', schemasStart);
let start = i + 1;
let end = start;
for (; i < content.length; i++) {
  if (content[i] === '{') braceCount++;
  if (content[i] === '}') braceCount--;
  if (braceCount === 0) {
    end = i;
    break;
  }
}
const schemasContent = content.slice(start, end);

const interfaces = schemasContent.split('};').map(s => s.split(':')[0].trim()).filter(s => s);

const f = 'import { components } from \'@/build/api_dto\';\n\n' + interfaces.map(i => `export type ${i} = components["schemas"]["${i}"];`).join('\n') + '\n';

fs.writeFileSync('./build/api_types.ts', f);

console.log("API interface types generated successfully.");