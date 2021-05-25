#!/bin/bash

function main(){
  local node_script=$1
  echo $node_script
  if [ -n "$node_script" ]; then {
    sudo docker run --net=host -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:latest \
    node $node_script
    
  } else {
     echo "Usage:"
     echo "      . ./docker_run.sh <node script.js>"
  };fi
}

main $1
