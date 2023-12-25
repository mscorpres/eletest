const { ipcMain, BrowserWindow } = require("electron");
const path = require('path');

console.warn("childWindow.js");
ipcMain.on("open-window", (event, arg) => {
    // console.log("open-window received renderer");
    // console.log(event);
    // console.log(arg);

    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: false, // is default value after Electron v5
            contextIsolation: true, // protect against prototype pollution
            enableRemoteModule: false, // turn off remote
            preload: path.join(__dirname, 'preload.js'),
        },
    });

    console.log("jjjjj" , path.join(__dirname, "../" + arg.pageUrl));

    win.loadFile(path.join(__dirname,"../"+ arg.pageUrl));

});
