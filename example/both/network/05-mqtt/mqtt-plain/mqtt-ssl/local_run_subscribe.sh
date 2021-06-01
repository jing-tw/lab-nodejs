#!/bin/bash

function main(){
  local broker_server_ip=$1
  local client_id=$2
  # Install node
  # install_node
  
  # Install necessary package 
  #install_package
  
  # Run Client
  if [ -n "$broker_server_ip" ] && [ -n "$client_id" ]; then {
    node client-sub.js $broker_server_ip $client_id
  } else {
     echo "Usage:"
     echo "      . ./local_run_subscribe.sh <broker server ip> <subscribe id>"
  };fi
  
}

function install_node(){
  sudo apt-get update
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
}

function install_package(){
   npm install mqtt
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

broker_server_ip=$1
client_id=$2
main $broker_server_ip $client_id

