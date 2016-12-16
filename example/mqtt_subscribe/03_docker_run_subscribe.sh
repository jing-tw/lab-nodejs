#!/bin/bash

broker_server_ip=172.20.10.3
client_id='subscribe_1'

# Install node.js docker
# docker pull node

# sudo docker run --net=host -it --rm --name my-running-script -v "$PWD":/usr/src/app -w /usr/src/app node:latest node example.js

workingEnv=${PWD##*/}.subscribe
echo $workingEnv
sudo docker run --net=host -it --rm --name $workingEnv -v "$PWD":/usr/src/app -w /usr/src/app node:latest bash local_run_subscribe.sh $broker_server_ip $client_id
