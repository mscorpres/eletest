const { } = require('electron');
// const io = require('socket.io-client');

// // const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);
// const socket = io(`http://localhost:5001`);

// socket.on('welcome', () => {
//     console.log('on welcome : welcome received renderer'); // displayed
//     // socket.emit('test')
// });
// socket.on('error', (e) => {
//     // console.log(e); // not displayed
// });
// socket.on('ok', () => {
//     // console.log("OK received renderer"); // not displayed
// });
// socket.on('connect', () => {
//     console.log("connected renderer"); // displayed
//     // socket.emit('test');
// });

const socketUrl = `http://localhost:5001`


// 

console.log("Preload");