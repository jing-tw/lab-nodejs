#!/bin/bash

# install node.js docker
# docker pull node

workingEnv=${PWD##*/}._Debug
echo $workingEnv
sudo docker run --net=host -it --rm --name $workingEnv -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash  clean.sh 
