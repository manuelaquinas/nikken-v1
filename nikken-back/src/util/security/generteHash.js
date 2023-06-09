const bcrypt = require('bcrypt');

function generateHash() {
    var encryptionKey = 'Encrypt for nikken session';
    const saltRounds = 10;
    var hash = bcrypt.hashSync(encryptionKey, saltRounds);
    return hash
}

module.exports = {
    generateHash
}
