#!/bin/bash
. ./system.sh

function Main() {
  System

  cp App.js ./myapp/src
  cd myapp
  npm start
}

function Test(){
  firefox http://localhost:3000/
}

Test
Main
