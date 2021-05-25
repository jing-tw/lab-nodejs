#!/bin/bash

function main(){
#  install_package
  node --max_old_space_size=2000 server.js
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

main

