#!/bin/bash
npm config set proxy http://10.110.15.60:8080
npm config set https-proxy http://10.110.15.60:8080

npm install bytes
npm install ascii-histogram
node example.js
#firefox example.html
