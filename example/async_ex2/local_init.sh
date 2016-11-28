#!/bin/bash
npm i -g npm-run 
npm i -D \
	browserify \
	babelify \
	babel-preset-es2015 \
	babel-preset-stage-3 \
	babel-runtime \
	babel-plugin-transform-runtime

echo '{
  "presets": ["es2015", "stage-3"],
  "plugins": ["transform-runtime"]
  }' > .babelrc
