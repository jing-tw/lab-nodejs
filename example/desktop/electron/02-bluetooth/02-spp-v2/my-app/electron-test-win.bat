@echo "== Clean all =="
del /s /q /f .\build  1>null
del /s /q /f .\node_modules 1>null
del /s /q /f .\node-bluetooth-elecorcamer 1>null
rmdir /S /Q .\build .\node_modules .\node-bluetooth-elecorcamer
@REM yarn clean   # reinstall

@echo "== Pull node-bluetooth =="
call yarn pull:node-bluetooth
call yarn add file:./node-bluetooth-elecorcamer/node-bluetooth

@echo "== Install all package =="
call yarn install

@echo "== [Electron] Rebuild all modules. The electron-rebuild will shows lots message. =="
call .\node_modules\.bin\electron-rebuild 
call npm rebuild   
@REM ./node_modules/.bin/electron-rebuild    # rebuild the package for electron node
@REM npm rebuild    # rebuild all package

@echo "== [Electron] Package to ./build =="
call yarn build
@REM yarn build       # package for electron 

@echo "== [Electron] Compile main.ts and run it in ./build == "
call npx tsc src\main.ts
copy /y .\src\*.js .\build
call node_modules\.bin\electron .
@REM yarn electron:win
@REM yarn electron  # run test

@echo " == [Electorn] Make Deploy and make ./out == "
electron-forge make