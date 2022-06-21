# Start
node webserver.js

# Test
gio open https://<Web-server-ip>:3001

# Detail
## Create the server certification using the server key (Option, if you have no self CA)
```bash
openssl req -nodes -new -x509 -keyout server.key -out server.cert
```
## Install Web Server (KOA)
```bash
// install n
curl -L https://git.io/n-install | bash

// or automatic install version (without ask)
curl -L https://git.io/n-install | bash -s -- -y  

// usage 
n 12

// uninstall n
// $n-uninstall -y


npm i koa

```
