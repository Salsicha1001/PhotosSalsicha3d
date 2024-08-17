const fs = require('fs');
const path = require('path');

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

const projectDir = path.resolve(__dirname);
const directoryStructure = readDirRecursive(projectDir);

console.log(JSON.stringify(directoryStructure, null, 2));

