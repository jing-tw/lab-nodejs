#!/bin/bash

function ProxyNPM() {
  if [ "$bProxy" = true ]
  then
    echo "NPM Proxy Enabled"
#    npm config set strict-ssl false
#    npm config set registry "http://registry.npmjs.org/"
#    npm config set proxy http://10.110.15.61:8080/

     npm config set https-proxy http://10.110.15.61:8080/
  else
     npm config rm proxy
  fi

}

function ProxyGit() {
  if [ "$bProxy" = true ]
  then
    echo "Git Proxy Enabled"
    git config --global http.proxy http://10.110.15.60:8080
    git config --global https.proxy https://10.110.15.60:8080
  else
    echo "Git Proxy Disable"
    git config --global --unset http.proxy
    git config --global --unset https.proxy
  fi
}

function ProxySetup() {
  bProxy=true
  ProxyNPM
  ProxyGit
}

function ProxyRM() {
  bProxy=false
  ProxyNPM
  ProxyGit
}
