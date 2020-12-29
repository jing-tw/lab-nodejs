import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// import { ipcRenderer } from 'electron'
const { ipcRenderer, IpcRendererEvent } = window.require("electron");
// import {IpcRendererEvent} from 'electron';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


let lstData:Array<number|string> = [1, 'string'];
ipcRenderer.invoke('perform-action', lstData);
console.log('index.tsx')

ipcRenderer.on('fromMainProcess', (event: typeof IpcRendererEvent, ...args:Array<any>) => {
  console.log('args from Main process = ' + args) // Prints 'whoooooooh!'
})

