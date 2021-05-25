echo "Clean all"
yarn clean   # reinstall

echo "Pull node-bluetooth"
yarn pull:node-bluetooth
yarn add file:./elecorcamer/node-bluetooth

echo "Install all package"
yarn install

echo "[Electron] Rebuild all modules"
#./node_modules/.bin/electron-rebuild    # rebuild the package for electron node
npx electron-rebuild
npm rebuild    # rebuild all package

echo "[Electron] Package to ./out"
yarn build       # package for electron 

echo "[Electron] Compile main.ts and run it in ./out"
yarn electron  # run test
