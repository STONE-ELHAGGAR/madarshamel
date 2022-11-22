var bcrypt = require('bcrypt');

comparePassword = function(plainPass, hashword, callback) {
   bcrypt.compare(plainPass, hashword, function(err, isPasswordMatch) {   
       return callback(err, isPasswordMatch);
   });
};

module.exports = comparePassword;