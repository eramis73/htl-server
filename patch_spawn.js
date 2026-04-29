const fs = require('fs');
const file = 'c:/Users/Enes/Desktop/Game Jam/index.html';
let content = fs.readFileSync(file, 'utf8');

// Find and replace just the key spawn condition line
const oldLine = "gameState.spawnTimer <= 0 && (gameState.levelTime < (conf.spawnDuration || 120) || activeZ < 10)";
const newBlock = `gameState.spawnTimer <= 0 && gameState.levelTime <= 60`;

// Also need to replace the spawnRate line
if (content.includes(oldLine)) {
    // Replace the complex condition with simple one
    content = content.replace(oldLine, newBlock);
    // Remove the activeZ declaration line
    content = content.replace("        const activeZ = gameState.entities.zombies.filter(z=>z.active).length;\n", "");
    // Replace spawnRate with hardcoded 1.0
    content = content.replace("           gameState.spawnTimer = conf.spawnRate; \n", "           gameState.spawnTimer = 1.0;\n");
    fs.writeFileSync(file, content, 'utf8');
    console.log('SUCCESS');
} else {
    console.log('Not found. Checking...');
    const idx = content.indexOf('spawnDuration');
    console.log(JSON.stringify(content.substring(idx - 20, idx + 100)));
}
