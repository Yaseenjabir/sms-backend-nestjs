import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const routeFolder = path.join(__dirname, 'student');
const outputFile = path.join(__dirname, 'output.txt');

fs.writeFileSync(outputFile, '', 'utf-8');

getAllFiles(routeFolder).forEach((file) => {
  fs.appendFileSync(outputFile, `\n// ${file}\n`, 'utf-8');
  fs.appendFileSync(outputFile, fs.readFileSync(file, 'utf-8'), 'utf-8');
});
