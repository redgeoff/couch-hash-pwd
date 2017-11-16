#!/usr/bin/env node

'use strict';

var fs = require('fs-extra');
var argv = require('yargs').argv;
var Pwd = require('../scripts');

var pwd = new Pwd();

var password = argv.password || argv.p;
var salt = argv.salt || argv.s;
var iterations = argv.iterations || argv.i;

// Missing the required attributes?
if (!password) {
  fs.createReadStream(__dirname + '/usage.txt')
    .on('close', function () {
      process.exit(1)
    })
    .pipe(process.stdout);
} else {
  pwd.hash(password, salt, iterations).then(function (hashedPwd) {
    console.log(hashedPwd);
  });
}
