const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.CRYPT_KEY);


function encrypt(data) {
  return cryptr.encrypt(data)
}

function decrypt(data) {
  return cryptr.decrypt(data)
}


module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;