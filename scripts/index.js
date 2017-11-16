'use strict';

var sporks = require('sporks');
var pwd = require('couch-pwd-updated');
var Promise = require('sporks/scripts/promise');

var hashPromise = sporks.promisify(pwd.hash);

var Pwd = function () {};

Pwd.prototype.hash = function (password, salt, iterations) {
  return Promise.resolve().then(function () {
    if (!iterations) {
      iterations = 10;
    }
    pwd.iterations(iterations);
    if (salt) {
      return hashPromise(password, salt);
    } else {
      return hashPromise(password);
    }
  }).then(function (value) {
    var hashedPwd = null;
    if (salt) {
      hashedPwd = value;
    } else {
      salt = value[0];
      hashedPwd = value[1];
    }
    return '-pbkdf2-' + hashedPwd + ',' + salt + ',' + iterations;
  });
};

Pwd.prototype.parse = function (hashedPwd) {
  var parsedPwd = hashedPwd.split(/-|,/);
  return {
    password: parsedPwd[2],
    salt: parsedPwd[3],
    iterations: parsedPwd[4]
  };
};

module.exports = Pwd;
