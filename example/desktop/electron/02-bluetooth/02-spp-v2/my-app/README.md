The example shows how to communicate to device via SPP.

Enjoy.
by Jing.

# Note: 
The bluetooth module node-bluetooth (https://github.com/eelcocramer/node-bluetooth) is work to "electron-rebuild" with older version electron@v6.1.12. Rewrite the bluetooth-serial-port native module should be a scheduled task.

# Build Environment
## Linux
sudo apt-get install build-essential
python 3.x
nodejs 12.x

## Windows
Visual Stuido 2019 Community			https://visualstudio.microsoft.com/downloads/
Python 3.x			Install from Windows Store
Git for Windows			https://gitforwindows.org/
NodeJS 12.x			https://nodejs.org/dist/latest-v12.x/


# Install 
```bash
yarn pull:node-bluetooth
yarn add file:./node-bluetooth-elecorcamer/node-bluetooth
yarn install
```

# Build
```bash
./node_modules/.bin/electron-rebuild    # rebuild the package for electron node
npm rebuild    # rebuild all package
yarn build       # package for electron
```

# Test
```bash
yarn test:test_lstAllSPPDevices    # test bluetooth spp
yarn electron 
```

# Deploy
```bash
yarn make
./out/my-app-linux-x64
./my-app
```

# Clean
```bash
yarn clean
```