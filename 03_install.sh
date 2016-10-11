#!/bin/bash
username=jing
ip=192.168.33.10
ssh-keygen -f ~/.ssh/known_hosts -R $ip
sshpass -p 1234 scp -o StrictHostKeyChecking=no ./common_fun.sh $username@$ip:/home/$username
#sshpass -p 1234 ssh -o StrictHostKeyChecking=no -t $username@$ip ". ./common_fun.sh;fun_setup_locale"

sshpass -p 1234 scp -o StrictHostKeyChecking=no ./local_install.sh $username@$ip:/home/$username
sshpass -p 1234 ssh -o StrictHostKeyChecking=no -t $username@$ip ". ./local_install.sh"


# verification
echo "== Verification =="
#sshpass -p 1234 ssh -o StrictHostKeyChecking=no -t $username@$ip "sudo docker ps "
