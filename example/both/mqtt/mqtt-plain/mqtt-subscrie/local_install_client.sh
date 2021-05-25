#!/bin/bash

function main() {
  echo local_install_package.sh
  #InstallNode
  InstallMQTTPackage
  #InstallBTPackage
}

function InstallNode(){
  sudo apt-get update
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs
}

function InstallMQTTPackage(){
  npm install mqtt
}

function InstallBTPackage(){
  sudo apt-get update
  curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
  sudo apt-get install -y nodejs

  # sudo apt-get -y install npm
  npm install noble                # BLE (Bluetooth Low Energy) central module.
  npm install socket.io-client     # Socket module
}

main



