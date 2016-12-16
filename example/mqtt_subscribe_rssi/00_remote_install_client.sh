#!/bin/bash

USERNAME=pi
PASSWD=raspberry

#USERNAME=jing
#PASSWD=1234

function RemoteInstall(){
  local username=$1
  local passwd=$2
  local ip=$3
  local payload=*.*

  echo username = $username
  echo passwd = $passwd
  echo ip = $ip
  # copy the payload
  ssh-keygen -f ~/.ssh/known_hosts -R $ip
  sshpass -p $passwd scp -o StrictHostKeyChecking=no -r ./$payload $username@$ip:/home/$username

  # run script
  sshpass -p $passwd ssh -X -o StrictHostKeyChecking=no -t $username@$ip ". ./local_install_client.sh"
}

function main() {
  EdgeIP=$1
  if [ -n "$EdgeIP" ]; then {
    local ip=$1
    RemoteInstall $USERNAME $PASSWD $ip
  } else {
     echo "Usage:"
     echo "      . ./00_remote_install <client_ip>"
  };fi
}

main $1
