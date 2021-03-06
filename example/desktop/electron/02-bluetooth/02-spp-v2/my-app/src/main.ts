// This code was modified from 
// https://www.freecodecamp.org/news/building-an-electron-application-with-create-react-app-97945861647c/#:~:text=a%20great%20tool.-,Electron%20and,is%20Facebook's%20JavaScript%20view%20framework.&text=And%20Electron%20is%20GitHub's%20framework,platform%20desktop%20apps%20in%20JavaScript.&text=Most%20use%20webpack%20for%20the%20configuration%20necessary%20for%20React%20development.
import {app, BrowserWindow} from 'electron';
import * as path from 'path';
import * as url from 'url';

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow:BrowserWindow|null;

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 800, height: 600,
        webPreferences: {
            nodeIntegration: true,
          }
        });

    // and load the index.html of the app.
    // mainWindow.loadURL('http://localhost:3000');
    //mainWindow.loadURL('file://${__dirname}/build/index.html');
    const startUrl = process.env.ELECTRON_START_URL || url.format({
        pathname: path.join(__dirname, '/../build/index.html'),
        protocol: 'file:',
        slashes: true
    });
    mainWindow.loadURL(startUrl);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })


    // main process --> render process
    mainWindow.webContents.on('did-finish-load', () => {
        if (mainWindow === null){
            return;
        }
        mainWindow.webContents.send('fromMainProcess', 'whoooooooh!')
      })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
        app.quit()
    }
});

app.on('activate', function () {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
        createWindow()
    }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

// In the Main process
import { ipcMain } from 'electron';

// ipcMain.handle('perform-action', (event, ...args) => {
//   // ... do actions on behalf of the Renderer
//   console.log('ipcMain hello');
//   console.log('args = ' + args);
// })
ipcMain.on('asynchronous-message', (event, arg) => {
    console.log(arg) // prints "ping"
    event.reply('asynchronous-reply', 'pong: reply from Main')
  })
  
ipcMain.on('synchronous-message', (event, arg) => {
console.log(arg) // prints "ping"
event.returnValue = 'pong: reply from Main'
})

// ============== BLE ===============
console.log('process.versions = ', process.versions);

import LoggerService from './LoggerService';
import BleSpp from './BleSpp';

class Test_BleSpp{
    static test_lstAllSPPDevices(){
        LoggerService.logger.info('test_lstAllSPPDevices\nPlease power on the devices.');
        let sppObj:BleSpp = new BleSpp();
        sppObj.lstAllSPPDevices();
    }
}

LoggerService.init();
Test_BleSpp.test_lstAllSPPDevices();
