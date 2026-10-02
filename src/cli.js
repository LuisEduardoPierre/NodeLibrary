//Agora o cli.js eh o entrypoint do projeto, ele vai ser o arquivo que vai ser executado quando o usuario rodar o comando node cli.js
//Trocamos a importacao via require de ambas as bibliotecas para importacao via import, pois o node agora suporta a sintaxe de importacao do ES6
import FS from 'fs';
import path from 'path';
import errorTreatment from './errors/errorFunctions.js';
import { countWords } from './index.js';
import { mountArchiveOutput } from './helpers.js';
import { Command } from 'commander';

const PROGRAM = new Command();

PROGRAM
  .version('1.0.0')
  .option('-t, --text <string>', 'file path to the text file')
  .option('-d, --destino <string>', 'destination path to save the result file');

PROGRAM.action((options) => {
  const { text, destino } = options;

  if (!text || !destino) {
    console.error('Both text file path and destination path are required.');
    PROGRAM.help();
    process.exit(1);
  }

  const FILE_PATH = path.resolve(text);
  const DEST_PATH = path.resolve(destino);

  try {
    console.log(`Processing file: ${FILE_PATH}`);
    console.log(`Result will be saved to: ${DEST_PATH}`);
    console.log('Please wait...');
    processFile(FILE_PATH, DEST_PATH);
  } catch (error) {
    console.error('An error occurred:', error.message);
  }
});

PROGRAM.parse(process.argv);

function processFile(text, destination) {
  FS.readFile(text, 'utf-8', (err, fileContent) => {
    try {
      if (err) throw err;

      const RESULT = countWords(fileContent);
      createAndSaveFile(RESULT, destination);
    } catch (error) {
      errorTreatment(error);
      console.error('File processing failed:', error.message);
    }
  });
}

async function createAndSaveFile(wordList, destination) {
  await FS.promises.mkdir(destination, { recursive: true });

  const NEW_FILE = path.join(destination, 'result.txt');
  const TEXT = mountArchiveOutput(wordList);

  try {
    await FS.promises.writeFile(NEW_FILE, TEXT);
    console.log(`File created at ${NEW_FILE}`);
  } catch (error) {
    throw error;
  }
}

//Essa eh uma segunda forma de fazer uma funcao assincrona,
//usando promises, que eh a forma mais moderna de se trabalhar com assincronismo no JS

//Diferente da solucao anterior, nos usamos o then e o catch para tratar o resultado da promise,
//e o finally para executar um codigo apos a promise ser resolvida ou rejeitada


//  function createAndSaveFile(wordList, path){
//     const NEW_FILE = `${path}/result.txt`;
//     const TEXT = JSON.stringify(wordList);
    
//     FS.promises.writeFile(NEW_FILE,TEXT)
//     .then(()=>{//Em caso de sucesso, o then vai ser executado, e podemos colocar o codigo que queremos executar apos a promise ser resolvida
//         console.log(`File created at ${NEW_FILE}`);
//     })
//     .catch((error)=>{//caso contrario ele sera capturado pelo catch, e podemos tratar o erro da forma que quisermos
//         throw error;
//     })
//     .finally(()=>{
//         console.log('Process finished');
//     })

// }
