# couch-hash-pwd

[![Circle CI](https://circleci.com/gh/redgeoff/couch-hash-pwd.svg?style=svg&circle-token=d129b786e4ed721fb68315479ab3027d82988ba2)](https://circleci.com/gh/redgeoff/couch-hash-pwd)
 [![Greenkeeper badge](https://badges.greenkeeper.io/redgeoff/couch-hash-pwd.svg)](https://greenkeeper.io/)

Hash CouchDB passwords

## Installation

    $ npm install -g couch-hash-pwd
    
## Usage

```
Usage: couch-hash-pwd -p clear-text-password [ -s salt ] [ -i iterations ]

  -p, --password        The clear text password that you wish to hash

  -s, --salt            Optional 16 character salt. If left blank then a random salt will be chosen

  -i, --iterations      Optional number of iterations

                        Default: 10
```

## Example

    $ couch-hash-pwd -p mysecret

Outputs: `-pbkdf2-515d6a879832819863e12475ad0bb6f03abb7f8e,88b2a6274f9ebeb3e2928a86382590ec,10`. You can then use this in the `[admins]` section of your CouchDB's local.ini, e.g.

    [admins]
    myuser = -pbkdf2-515d6a879832819863e12475ad0bb6f03abb7f8e,88b2a6274f9ebeb3e2928a86382590ec,10


## [Testing](TESTING.md)
