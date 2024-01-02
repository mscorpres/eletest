const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  socketUrl: `http://localhost:${process.env.SOCKET_PORT}`,
  ipcRenderer: {
    send: (channel, data) => {
      ipcRenderer.send(channel, data);
      console.log('on send : send received renderer');
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    },
    invoke : async (channel, data) => {
      return await ipcRenderer.invoke(channel, data);
    }
  },
})


// const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);
// const socket = io(`http://localhost:5001`);

// socket.on('welcome', () => {
//   console.log('on welcome : welcome received renderer'); // displayed
//   // socket.emit('test')
// });
// socket.on('error', (e) => {
//   // console.log(e); // not displayed
// });
// socket.on('ok', () => {
//   // console.log("OK received renderer"); // not displayed
// });
// socket.on('connect', () => {
//   console.log("connected renderer"); // displayed
//   // socket.emit('test');
// });


// 

console.log("Preload");