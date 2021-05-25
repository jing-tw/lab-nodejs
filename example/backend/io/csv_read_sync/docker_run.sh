#!/bin/bash
workingEnv=${PWD##*/}

echo $workingEnv
sudo docker run --net=host -it --rm --name $workingEnv -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash local_run.sh
