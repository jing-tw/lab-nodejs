# Install 
```bash
yarn install
```

# Dev
```bash
yarn build
# yarn start     //< --- Disable WebApp! Because of you use ipcMain to communicate Electron main
yarn electron    // Electron App Only
```

# Deploy
```bash
yarn build
yarn electron
yarn make
```

# Run
```bash
cd ./out/my-app-linux-x64
./my-app
```
