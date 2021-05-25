#!/bin/bash
. ./system.sh

function Main() {
  System

#  npm install --save jStat
  cp App.js ./myapp/src
  cd myapp
  npm start
}


Main
