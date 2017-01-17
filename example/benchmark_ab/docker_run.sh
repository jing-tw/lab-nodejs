#!/bin/bash

function main(){
  local local_script=$1
  echo $local_script
  if [ -n "$local_script" ]; then {
    sudo docker run --net=host -it --rm --name docker_name_$local_script -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash $local_script
  } else {
     echo "Usage:"
     echo "      . ./docker_run.sh <local_script.sh>"
  };fi
}

main $1
