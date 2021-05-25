== Install Docker Node Image ==
sudo docker pull node

== Run ==
sudo docker run --net=host \
-it --rm \
--name my-running-script \
-v "$PWD":/usr/src/app \
-w /usr/src/app node:4 \
node example.js

== List image ==
sudo docker -a

== Stop ==
sudo docker stop {id}

Reference
https://hub.docker.com/_/node/


Detail
https://docs.google.com/document/d/1tACXyMKyJ0cjpCoKX-EVzN9pBnryZE8EaOV7vOxAGFY/edit?usp=sharing

