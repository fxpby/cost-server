'use strict';

const crypto = require('crypto');

module.exports = () => {
  return {
    aesEncrypt(data, key = 'fxpby') {
      console.log('data=>', data);
      const cipher = crypto.createCipher('aes192', key);
      let crypted = cipher.update(data, 'utf8', 'hex');
      crypted += cipher.final('hex');
      return crypted;
    },

    aesDecrypt(encrypted, key = 'fxpby') {
      const decipher = crypto.createDecipher('aes192', key);
      let decrypted = decipher.update(encrypted, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    },
  };
};
