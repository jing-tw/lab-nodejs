#!/bin/bash

# Pull node.js docker image
# docker pull node

workingEnv=${PWD##*/}._Debug
echo $workingEnv
sudo docker run --net=host -it --rm --name $workingEnv -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash  local_init.sh 
