const fs = require('fs');
const path = require('path');

function listDirectories(dirPath) {
    let results = [];

    // Lê o conteúdo do diretório
    const list = fs.readdirSync(dirPath);

    list.forEach((file) => {
        const filePath = path.join(dirPath, file);

        // Verifica se é um diretório
        if (fs.statSync(filePath).isDirectory()) {
            results.push(file); // Adiciona o nome do diretório atual

            // Chama a função recursivamente para listar subpastas
            results = results.concat(listDirectories(filePath).map(subDir => path.join(file, subDir)));
        }
    });

    return results;
}

// Exemplo de uso
const rootDir = '\Cosplay'; 
const directories = listDirectories(rootDir);
console.log(directories)
