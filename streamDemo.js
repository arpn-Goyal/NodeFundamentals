import fs from 'fs';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// 👇 Get __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const _dirname = dirname(_filename);

const inputFile = join(__dirname, 'sample.txt');
const outputFile = join(__dirname, 'output.txt');

// 1. Read file with custom chunk size
console.log('\n🧪 Step 1: Reading in 20-byte chunks...\n');

const readStream = fs.createReadStream(inputFile, {
  encoding: 'utf8',
  highWaterMark: 20,
});

readStream.on('data', (chunk) => {
  console.log('📦 Chunk:', JSON.stringify(chunk));
});

readStream.on('end', () => {
  console.log('\n✅ Step 1 complete.\n');

  // Start line-by-line read
  readLineByLine();
});

// 2. Line-by-line reading and writing
function readLineByLine() {
  console.log('🧪 Step 2: Reading line by line and writing to output.txt...\n');

  const lineReader = readline.createInterface({
    input: fs.createReadStream(inputFile),
    crlfDelay: Infinity,
  });

  const writeStream = fs.createWriteStream(outputFile);

  lineReader.on('line', (line) => {
    console.log('📄 Line:', line);
    writeStream.write(line + '\n');
  });

  lineReader.on('close', () => {
    writeStream.end();
    console.log('\n✅ Step 2 complete. Lines written to output.txt\n');
  });
}