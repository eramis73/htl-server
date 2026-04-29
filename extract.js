const fs = require('fs');
const html = fs.readFileSync('c:/Users/Enes/Desktop/Game Jam/index.html', 'utf8');
const start = html.indexOf('<script>') + '<script>'.length;
const end = html.indexOf('</script>');
const js = html.substring(start, end);
fs.writeFileSync('c:/Users/Enes/Desktop/Game Jam/test_check.js', js);
