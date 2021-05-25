#!/bin/bash

#node example.js

function main(){
  local local_script=$1
  echo $local_script
  if [ -n "$local_script" ]; then {
    node $local_script
  } else {
     echo "Usage:"
     echo "      . ./local_run.sh <nodejs.js>"
  };fi
}

main $1
