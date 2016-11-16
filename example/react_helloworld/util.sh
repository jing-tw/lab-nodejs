#!/bin/bash

function ProxyNPM() {
  if [ "$bProxy" = true ]
  then
    echo "Proxy Enabled"
#    npm config set strict-ssl false
#    npm config set registry "http://registry.npmjs.org/"
#    npm config set proxy http://10.110.15.61:8080/

     npm config set https-proxy http://10.110.15.61:8080/
  else
    npm config rm proxy
  fi

}

function ProxySetup() {
  bProxy=true
  ProxyNPM
}

function ProxyRM() {
  bProxy=false
  ProxyNPM
}
