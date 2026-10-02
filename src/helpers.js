function filterOcurrences(paragraph){
    return Object.keys(paragraph).filter(key => paragraph[key] > 1)
    
}

function mountArchiveOutput(wordList){
    let finalText = '';
    wordList.forEach((paragraph, index) => {
        const DUPLICATED_WORDS = filterOcurrences(paragraph).join(', ');
        finalText += `\n\nParagraph ${index + 1}:\nDuplicated words: ${DUPLICATED_WORDS}\n`;
    })
    return finalText;
}

export { mountArchiveOutput }