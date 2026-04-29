const fs = require('fs');
const html = fs.readFileSync('c:/Users/Enes/Desktop/Game Jam/index.html', 'utf8');
const scriptPart = html.split('<script>')[1].split('</script>')[0];
fs.writeFileSync('c:/Users/Enes/Desktop/Game Jam/test_check.js', scriptPart);
try {
    require('child_process').execSync('node "c:/Users/Enes/Desktop/Game Jam/test_check.js"', {stdio: 'inherit'});
} catch(e) {
    console.error("Syntax execution error.");
}
