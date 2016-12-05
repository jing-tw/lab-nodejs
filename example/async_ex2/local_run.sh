#!/bin/bash
#node example.js

npm i -g npm-run
#. ./local_init.sh
whereis npm-run
npm-run browserify -t babelify example.js | node
# node example.js
