#!/bin/bash

# Install node.js docker
# docker pull node

# sudo docker run --net=host -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:latest node example.js

workingEnv=${PWD##*/}.Server_Debug
echo $workingEnv
sudo docker run --net=host -it --rm --name $workingEnv -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash local_run_server.sh
