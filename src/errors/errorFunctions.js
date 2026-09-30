function errorTreatment(error){
    if(error.code == 'ENOENT'){
        throw new Error('Archive not found');
    }else{
        return 'Application with error';
    }
}

module.exports = errorTreatment