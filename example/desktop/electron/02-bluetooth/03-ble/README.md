
# Quick
```bash
yarn install   # install requirements
yarn start # testing the Ble device (Pls make sure the device was powered on and does not be connected.)
```
# Clean
yarn clean

# Detail
## Requirement
```bash
tsc --init
yarn init
yarn add @abandonware/noble winston winston-transport-browserconsole 
yarn add -D rimraf
```
## Build
tsc src/01-test-ble-device-basic.ts

## Test
sudo node src/01-test-ble-device-basic.js