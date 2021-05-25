#!/bin/bash

sudo docker run --net=host -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:4 node example.js
