#!/bin/bash

function InstallNode(){
  sudo apt-get update
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
}

function InstallPackage(){
#  npm install mosca pino -g
#  mosca -v | pino

   npm install mosca
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


#InstallNode
node -v
#npm_proxy
InstallPackage
