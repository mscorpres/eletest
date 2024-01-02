const { ipcMain, app } = require('electron');
const axios = require('axios');

const Store = require('electron-store');
Store.initRenderer();
const store = new Store();


ipcMain.handle('getStorage', (event, key) => {
    return store.get(key)
});

ipcMain.on('setStorage', (event, data) => {
    store.set(data.key, data.value)
})

ipcMain.handle('logout', (event, key) => {
    store.delete("user")
    store.delete("isLogin")
    return true;
});


const axiosInstance = axios.create({
    headers: {
        "x-csrf-token": store.get("user").token,
        "Accept": "application/json",
        "Content-Type": "application/json",
    },
});
// AXIOS API
ipcMain.handle('axiosPost', async (event, data) => {
    console.log("url", data.url)
    console.log("data", data.data)
    const response = await axiosInstance.post(data.url, data.data);
    return response.data;
});
ipcMain.handle('axiosGet', (event, data) => {
    const response = axiosInstance.get(data.url);
    return response.data;
});




console.log("helper loaded");

