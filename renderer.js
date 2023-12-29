const { ipcRenderer } = require('electron');

ipcRenderer.on('send_mail', (event, message) => {
    // console.log("send_mail received renderer");
    // console.log(message);
})  