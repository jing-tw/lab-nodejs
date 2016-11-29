#!/bin/bash

function install_nightbuild(){
  curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.32.1/install.sh | bash

  # load nvm
  export NVM_DIR="/root/.nvm"
  [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"


  NVM_NODEJS_ORG_MIRROR=https://nodejs.org/download/nightly
  nvm install 7
  nvm use 7
}

# install_nightbuild

node --harmony-async-await example.js

