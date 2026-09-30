//Nesse projeto o objetivo e fazer um leitor de arquivos dentro do sistema
//usando o node como motor e o js como linguagem

const FS = require('fs');
const errorTreatment = require('./errors/errorFunctions')
//Primeiro passo eh definir a leitura dos arquivos
//Como pode ser percebido abaixo, defino duas constantes
//uma que recebe o system.argv  e o segundo que
//vai utilizar a terceira posicao do array para entregar o caminho do arquivo posteriormente
const CAMINHO_ARQUIVO = process.argv; // pode ser testado com node index.js 'string qualquer' (sem aspas)
const LINK = CAMINHO_ARQUIVO[2];

//Segundo passo foi chamar o modulo de leitura de arquivos do node FS
//Chamamos a funcao readFile com a documentacao presente em: https://nodejs.org/api/fs.html#file-system
//apos isso colocamos LINK que e nossa string de acesso, o encoding e a callback que o metodo exige
//e apos isso apenas imprimimos o texto vindo da pasta archives
FS.readFile(LINK,'utf-8',(err, text) => {
    try {
        if(err) throw err;
        countWords(text);
    } catch(error){
        errorTreatment(error);
    }
    
});


function countWords(text){
    const PARAGRAPHS = extractParagraphs(text)
    const COUNT = PARAGRAPHS
    .flatMap((paragraph) => {
        if(!paragraph) return [];
        return verifyDuplicateWords(paragraph)
    })
        
    console.log(COUNT)
}

function extractParagraphs(text){
    return text.toLowerCase().split('\n')//Transforma o texto em minuscula e depois separa os caracteres de quebra de linha
}

//Quarto passo, tratar paragrafos e texto maisculo e minusculo
function makeParagraphs(text){
    
}

//Quinto passo, limpez de palavras usando replace com regex, inclusive acabei de ver essa aplicacao no JsCangaceiro
function cleanWords(word){
    return word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
}

//Terceiro passo, criar um array com as palavras
//, depois contar as ocorrencias de palavras e finalmente,
//montar um objeto com o resultado
function verifyDuplicateWords(text){
    const wordList = text.split(' ');
    const result = {}

    //object[propriedade] = value
    wordList.forEach(word => {
        if(word.length >= 3){
        const cleanWord = cleanWords(word);
        result[cleanWord] = (result[cleanWord] || 0) + 1
        }
    });
    return result
};
