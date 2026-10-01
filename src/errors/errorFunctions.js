//Podemos usar o comando export default para exportar a funcao de tratamento de erros, assim podemos importar ela em outros arquivos
//export default eh muito usado em bibliotecas, pois permite que o usuario da biblioteca importe a funcao sem precisar saber o nome dela

export default function errorTreatment(error){ //Um export default so pode ser usado uma vez por arquivo, mas podemos ter varios exports nomeados
    if(error.code == 'ENOENT'){
        throw new Error('Archive not found');
    }else{
        return 'Application with error';
    }
}

