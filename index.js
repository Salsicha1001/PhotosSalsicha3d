const fs = require('fs');
const path = require('path');

// Função para listar diretórios e arquivos
function listDirectoryContents(dirPath) {
    let results = {
        name: path.basename(dirPath),
        type: 'directory',
        children: []
    };
    
    const list = fs.readdirSync(dirPath);

    list.forEach(function(file) {
        const fullPath = path.join(dirPath, file);
        const stat = fs.statSync(fullPath);

        if (stat && stat.isDirectory()) {
            results.children.push(listDirectoryContents(fullPath));
        } else {
            results.children.push({
                name: file,
                type: 'file'
            });
        }
    });

    return results;
}

// Diretório raiz do projeto
const rootDir = path.resolve('salsicha3d');

// Gera lista de diretórios e arquivos
const directoryStructure = listDirectoryContents(rootDir);

// Gera o conteúdo JSON
const jsonContent = JSON.stringify(directoryStructure, null, 2);

// Salva o arquivo JSON
fs.writeFileSync('salsicha3d.json', jsonContent);

console.log('Arquivo JSON gerado com sucesso!');
