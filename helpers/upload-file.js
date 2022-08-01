const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtensions = ['png','jpg','jpeg','gif'], directory = '' ) => {

    return new Promise( (resolve, reject) => {

        const { file } = files;
        const splitedName = file.name.split('.');
        const extension = splitedName[ splitedName.length - 1 ];

        // Validar la extension
        if ( !validExtensions.includes( extension ) ) {
            return reject(`The extension ${ extension } is not allowed - ${ validExtensions }`);
        }
        
        const nameTemp = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/', directory, nameTemp );

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            resolve( nameTemp );
        });

    });

}

module.exports = {
    uploadFile,
}