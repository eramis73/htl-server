const fs = require('fs');
const file = 'c:/Users/Enes/Desktop/Game Jam/index.html';
let content = fs.readFileSync(file, 'utf8');

const idx = content.indexOf('if(gameState.zombiesAwake)');
const block = content.substring(idx, idx + 600);
console.log(JSON.stringify(block));
