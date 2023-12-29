const { ipcMain, BrowserWindow , Menu } = require("electron");
const menu = require('./menu');
const path = require('path');

console.warn("childWindow.js");
ipcMain.on("open-window", (event, arg) => {
    // console.log("open-window received renderer");
    // console.log(event);
    console.log(arg);

    const win = new BrowserWindow({
        width: arg.width ?? 800,
        height: arg.height ?? 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, '../preload.js'),
        },
    });

    console.log("jjjjj", path.join(__dirname, "../" + arg.pageUrl));

    Menu.setApplicationMenu(null);

    win.loadFile(path.join(__dirname, "../" + arg.pageUrl));

    win.on("closed", () => {
        Menu.setApplicationMenu(menu);
    })

});
