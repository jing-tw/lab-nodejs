@echo off
@echo "== Clean all =="
call yarn clean

@echo "== Pull node-bluetooth =="
call yarn pull:node-bluetooth
call yarn add file:./elecorcamer/node-bluetooth

@echo "== Install all package =="
call yarn install

@echo "== [Electron] Rebuild all modules. The electron-rebuild will shows lots message. =="
call npx electron-rebuild 
call npm rebuild   

@echo "== [Electron] Package to ./build =="
call yarn build

@echo "== [Electron] Compile main.ts and run it in ./build == "
yarn electron 

@echo " == [Electorn] Make Deploy and make ./out == "
call npx electron-forge make