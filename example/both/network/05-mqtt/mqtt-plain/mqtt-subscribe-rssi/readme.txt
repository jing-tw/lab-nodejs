# Broker 
1. install package
. ./00_docker_install_server.sh

2. start up broker
. ./01_docker_run_server.sh


# Subscribe client
1. install package
vi ./local_run_subscribe.sh  
uncomment "install_package"

2. start up subcribe client
. ./03_docker_run_subscribe.sh


# Publish client
1. install package
. ./00_remote_install_client.sh

2. start up publish client
. ./02_remote_run_client.sh
