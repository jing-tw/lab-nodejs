#!/bin/bash

. ./system.sh

function Main() {
  System

  npm install -g create-react-app
  create-react-app myapp
}

Main
