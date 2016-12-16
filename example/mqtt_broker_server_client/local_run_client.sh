#!/bin/bash

function main(){
  local server_ip=$1
  
  # Install necessary package 
  # install_package
  
  # Run Client
  if [ -n "$server_ip" ]; then {
    run_client $server_ip
  } else {
     echo "Usage:"
     echo "      . ./local_run_client.sh <broker server ip>"
  };fi
  
}

function run_client(){
  local server_ip=$1
  sudo node client.js $server_ip
}


function install_node(){
  sudo apt-get update
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
}

function install_package(){
#  npm install mosca pino -g
#  mosca -v | pino
   npm install mosca
}


function check_package(){
    local package=$1
    sudo dpkg -l $package > /dev/null 2>&1
    if [ $? == '0' ]; then
        echo '0'
    else
        echo '1'
    fi
}

server_ip=$1
main $server_ip

