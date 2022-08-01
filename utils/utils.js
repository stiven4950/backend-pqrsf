const generateRandom = (num, characters) => {
    let result1= '';
    const charactersLength = characters.length;
    for ( let i = 0; i < num; i++ ) {
        result1 += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result1;
}

const generateTicketNumber = () => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const lettersAndNumbers = letters + numbers;

    return `${generateRandom(3, letters)}-${generateRandom(6, numbers)}-${generateRandom(6, lettersAndNumbers)}`;
}

module.exports = {
    generateRandom,
    generateTicketNumber,
}