const { ipcMain, BrowserWindow, Menu } = require("electron");
const menu = require('./menu');
const path = require('path');

const newWindowOpen = ({ width = 800, height = 600, pageUrl = 'index.html', maximizable = true, resizable = true, minimizable = true, alwaysOnTop = false , title = app.name}) => {

    const win = new BrowserWindow({
        title: title,
        maximizable: maximizable,
        resizable: resizable,
        minimizable: minimizable,
        alwaysOnTop: alwaysOnTop,
        width: width,
        height: height,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, './preload.js'),
        },
    });

    Menu.setApplicationMenu(null);

    win.loadFile(path.join(__dirname, "../" + pageUrl));

    win.on("closed", () => {
        Menu.setApplicationMenu(menu);
    })

}

module.exports = newWindowOpen