
Step 1: Create Certificatie File and Key
openssl req  -new  -x509 -days 18250  -nodes -keyout  ca.key -out ca.crt

// Create Broker Certification
openssl req  -new  -x509 -days 18250  -nodes -keyout  broker.key -out broker.crt

// Create Client Certification
openssl req  -new  -x509 -days 18250  -nodes -keyout  client.key -out client.crt

 
Step 2:  Start Broker
. ./01_docker_run_server.sh

Step 3: Start Client: Publish
. ./02_remote_run_client.sh
