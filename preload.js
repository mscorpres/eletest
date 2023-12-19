const { contextBridge ,ipcRenderer  } = require('electron');
const io = require('socket.io-client');

contextBridge.exposeInMainWorld('electron', {
  socket: () => {
    return io(`http://localhost:${process.env.SOCKET_PORT}`);
  },
  ipcRenderer : {
    send: (channel, data) => {
      ipcRenderer.send(channel, data)
    },
    on: (channel, func) => {
      ipcRenderer.on(channel, (event, ...args) => func(...args))
    }
  }
})

const db = require('./dbConfig.js');
db.db.query("SELECT 1 + 1 AS solution", function (err, results, fields) {
  if (err) throw err;
  // console.log('The solution is: ', results[0].solution);
});

const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);

socket.on('welcome', () => {
  // console.log('on welcome : welcome received renderer'); // displayed
  socket.emit('test')
});
socket.on('error', (e) => {
  // console.log(e); // not displayed
});
socket.on('ok', () => {
  // console.log("OK received renderer"); // not displayed
});
socket.on('connect', () => {
  // console.log("connected renderer"); // displayed
  socket.emit('test');
});

console.log("Preload");