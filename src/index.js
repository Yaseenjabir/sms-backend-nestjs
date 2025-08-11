import fs from 'fs';
import path from 'path';

function getAllFiles(dirPath, files = []) {
  fs.readdirSync(dirPath).forEach((file) => {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, files);
    } else {
      files.push(fullPath);
    }
  });
  return files;
}

const routeFolder = './class';
getAllFiles(routeFolder).forEach((file) => {
  console.log(`\n// ${file}\n`);
  console.log(fs.readFileSync(file, 'utf-8'));
});
