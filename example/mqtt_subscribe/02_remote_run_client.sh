#!/bin/bash

# Edge 104
USERNAME=pi
PASSWD=raspberry
ClientIP=172.20.10.7
strClientID=$ClientIP
ServerIP=172.20.10.3

# Test VM
USERNAME=jing
PASSWD=1234
ClientIP=172.20.10.11
#ServerIP=192.168.0.193

ServerPort=1883


#ConnPortCollection=("6969" "6970" "6971" "6972" "6973")

function PayLoad(){
  local username=$1
  local passwd=$2
  local ip=$3
  
  local payload=*.*

  # copy the payload
  ssh-keygen -f ~/.ssh/known_hosts -R $ip
  sshpass -p $passwd scp -o StrictHostKeyChecking=no -r ./$payload $username@$ip:/home/$username
}


function run_remote_client(){
  local server_ip=$1
  local client_ip=$2
  sshpass -p $PASSWD ssh -X -o StrictHostKeyChecking=no -t $USERNAME@$client_ip ". ./local_run_client.sh $server_ip"
}


function main(){
  local server_ip=$1
  local client_ip=$2
  local client_id=$3
  
  # Deliver the payload to client
  PayLoad  $USERNAME $PASSWD $client_ip 
 
  # Run Client
  #if [ -n "$server_ip" -a -n "$client_ip" ]; then {
  if [ -n "$server_ip" ] && [ -n "$client_ip" ]; then {
    #run_remote_client $server_ip $client_ip
    sshpass -p $PASSWD ssh -X -o StrictHostKeyChecking=no -t $USERNAME@$client_ip ". ./local_run_client.sh $server_ip $client_id" 
  } else {
     echo "Usage:"
     echo "      . ./local_run_client.sh <broker server ip> <client ip>"
  };fi
}

main $ServerIP $ClientIP $strClientID
