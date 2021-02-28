const { v4: uuidv4 } = require('uuid');

const params = fileName => {
    const myFile = fileName.originalname.split('.');
    const fileType = myFile[myFile.length - 1];

    const imageParams = {
        Bucket: 'user-images-fd25f423-d1c6-4980-9b58-7b7aca2a7a2f',
        Key: `${uuidv4()}.${fileType}`,
        Body: fileName.buffer
    };

    return imageParams;
};

module.exports = params;