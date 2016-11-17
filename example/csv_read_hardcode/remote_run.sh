#/bin/bash

script=*.*
username=jing
ip=192.168.33.10

rm -fr result
mkdir ./result

ssh-keygen -f ~/.ssh/known_hosts -R $ip
sshpass -p 1234 scp -o StrictHostKeyChecking=no ./$script $username@$ip:/home/$username
sshpass -p 1234 ssh -X -o StrictHostKeyChecking=no -t $username@$ip ". ./local_run_his.sh"

echo "Verification"
# sshpass -p 1234 ssh -X -o StrictHostKeyChecking=no -t $username@$ip "cat env.csv"
# sshpass -p 1234 scp -o StrictHostKeyChecking=no $username@$ip:/home/$username/raw.csv.js .
sshpass -p 1234 scp -o StrictHostKeyChecking=no $username@$ip:/home/$username/his.csv.js ./result

echo "check"
ls -la ./result
