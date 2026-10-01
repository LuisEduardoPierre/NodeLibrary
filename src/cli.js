//Agora o cli.js eh o entrypoint do projeto, ele vai ser o arquivo que vai ser executado quando o usuario rodar o comando node cli.js
//Trocamos a importacao via require de ambas as bibliotecas para importacao via import, pois o node agora suporta a sintaxe de importacao do ES6
import FS from 'fs';
import errorTreatment from './errors/errorFunctions.js'
import { countWords } from './index.js'

const CAMINHO_ARQUIVO = process.argv; // pode ser testado com node index.js 'string qualquer' (sem aspas)
const LINK = CAMINHO_ARQUIVO[2];
const DESTINATION = CAMINHO_ARQUIVO[3];

FS.readFile(LINK,'utf-8',(err, text) => {
    try {
        if(err) throw err;
        const RESULT = countWords(text);
        createAndSaveFile(RESULT, DESTINATION);

    } catch(error){
        errorTreatment(error);
    }
    
});

async function createAndSaveFile(wordList, path){
    const NEW_FILE = `${path}/result.txt`;
    const TEXT = JSON.stringify(wordList);
    try{
        await FS.promises.writeFile(NEW_FILE,TEXT);
        console.log(`File created at ${NEW_FILE}`);
    }catch(error){
        throw error;
    }
}
