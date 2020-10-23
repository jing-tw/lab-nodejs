#!/bin/bash

function main(){
  local node_module=$1
  echo $node_script
  if [ -n "$node_module" ]; then {
    sudo docker run --net=host -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:latest \
      npm install $node_module
  } else {
     echo "Usage:"
     echo "      . ./docker_install.sh <node_module>"
  };fi
}

main $1
