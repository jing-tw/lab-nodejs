#!/bin/bash

function main(){
  local server_ip=$1
  local client_id=$2
  
  echo "server_ip=" $server_ip
  echo "client_id=" $client_id
  
  # Install necessary package 
  # install_package
  
  # Run Client
  if [ -n "$server_ip" ] && [ -n "$client_id" ]; then {
    sudo node client.js $server_ip $client_id
  } else {
     echo "Usage:"
     echo "      . ./local_run_client.sh <broker server ip> <client-pub-id>"
  };fi
  
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
client_id=$2
main $server_ip $client_id

