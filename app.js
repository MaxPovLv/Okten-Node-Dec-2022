const fs = require('node:fs');
const path = require('path');

const mainDir = 'mainFolder';
if (!fs.existsSync(mainDir)) {
    fs.mkdirSync(mainDir);
}

for (let i = 1; i <= 5; i++) {
    const folderPath = path.join(mainDir, `folder${i}`);
    const filePath = path.join(mainDir, `file${i}.txt`);

    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
    }

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '', 'utf8');
    }
}

fs.readdirSync(mainDir).forEach(file => {
    const filePath = path.join(mainDir, file);
    if (fs.statSync(filePath).isDirectory()) {
        console.log(`FOLDER: ${file}`);
    } else {
        console.log(`FILE: ${file}`);
    }
});
