const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const port = 3000;
function readDirRecursive(dirPath) {
    const result = { name: path.basename(dirPath), type: 'directory', children: [] };

    const items = fs.readdirSync(dirPath);
    for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = fs.statSync(fullPath);

        if (stats.isDirectory()) {
            result.children.push(readDirRecursive(fullPath));
        } else if (stats.isFile()) {
            result.children.push({ name: item, type: 'file' });
        }
    }

    return result;
}
 
app.get('/api/files', (req, res) => {
    const projectDir = path.resolve(__dirname); // Ajuste conforme necessário
    const directoryStructure = readDirRecursive(projectDir);
    res.json(directoryStructure);
});

// Servir arquivos estáticos, como HTML e CSS
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});