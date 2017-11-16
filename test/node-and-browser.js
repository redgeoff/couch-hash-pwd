'use strict';

var Pwd = require('../scripts');

describe('node and browser', function () {

  var pwd = new Pwd();
  var password = 'admin';

  it('should hash password', function () {
    // Hash without salt
    return pwd.hash(password).then(function (hashedPwd1) {
      // Hash with salt
      var parsedPwd = pwd.parse(hashedPwd1);
      return pwd.hash(password, parsedPwd.salt).then(function (hashedPwd2) {
        hashedPwd2.should.eql(hashedPwd1);
      });
    });
  });

  // Note: this test establishes a baseline
  it('should hash password with salt', function () {
    var salt = 'b9e81da8ecb2bcbf80cecf8e3386ed87';
    return pwd.hash(password, salt).then(function (hashedPwd) {
      var parsedPwd = pwd.parse(hashedPwd);
      parsedPwd.should.eql({
        password: '5b96ee7d09f9bc063d3c9a076c30ce2f72b55f26',
        salt: salt,
        iterations: '10'
      });
    });
  });

  it('should hash password with non-standard iterations', function () {
    return pwd.hash(password, null, 20).then(function (hashedPwd) {
      var parsedPwd = pwd.parse(hashedPwd);
      parsedPwd.iterations.should.eql('20');
    });
  });

});
