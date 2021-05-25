#!/bin/bash

function main(){
    DockerRun
}

function InstallDocker(){
  sudo curl -sSL https://get.docker.io/ | sh
}

function DockerRun(){
    workingEnv=${PWD##*/}Debug
    echo $workingEnv
    sudo docker run --net=host -it --rm --name $workingEnv -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash local_run.sh
}

main
