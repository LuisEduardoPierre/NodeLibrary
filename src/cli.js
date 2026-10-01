//Agora o cli.js eh o entrypoint do projeto, ele vai ser o arquivo que vai ser executado quando o usuario rodar o comando node cli.js
//Trocamos a importacao via require de ambas as bibliotecas para importacao via import, pois o node agora suporta a sintaxe de importacao do ES6
import FS from 'fs';
import errorTreatment from './errors/errorFunctions.js'
import { countWords } from './index.js'

const CAMINHO_ARQUIVO = process.argv; // pode ser testado com node index.js 'string qualquer' (sem aspas)
const LINK = CAMINHO_ARQUIVO[2];

FS.readFile(LINK,'utf-8',(err, text) => {
    try {
        if(err) throw err;
        countWords(text);
    } catch(error){
        errorTreatment(error);
    }
    
});
