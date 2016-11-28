#!/bin/bash
#node example.js

#d/dnpm i -g npm-run
. ./local_init.sh
npm-run browserify -t babelify example.js | node
# node example.js
