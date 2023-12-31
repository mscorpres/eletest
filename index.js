'use strict';
const path = require('path');
const { app, BrowserWindow, Menu, dialog, ipcMain, screen } = require('electron');
/// const {autoUpdater} = require('electron-updater');
const { is } = require('electron-util');
const unhandled = require('electron-unhandled');
const debug = require('electron-debug');
const contextMenu = require('electron-context-menu');
const config = require('./config.js');
const menu = require('./utils/menu.js');
const axios = require('axios');
const Store = require('electron-store');
const store = new Store();
require('./utils/helper.js');

const ejse = require('ejs-electron')
ejse.data('baseurl', 'file://' + __dirname.replace(/\\/g, '/'))
ejse.data('hrmsApi', "http://localhost:3001")


const { autoUpdater, AppUpdater } = require("electron-updater");

//Basic flags
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = true;

unhandled();
// debug();
contextMenu();

process.env.SOCKET_PORT = 5001;

// Note: Must match `build.appId` in package.json
app.setAppUserModelId('com.company.AppName');

let mainWindow;


const createMainWindow = async () => {

	const primaryDisplay = screen.getPrimaryDisplay()
	const { width, height } = primaryDisplay.workAreaSize

	const window_ = new BrowserWindow({
		title: app.name,
		show: false,
		width: width,
		height: height,
		webPreferences: {
			nodeIntegration: false, // is default value after Electron v5
			contextIsolation: true, // protect against prototype pollution
			enableRemoteModule: false, // turn off remote
			preload: path.join(__dirname, 'preload.js'),
		},
		// transparent: true,
		// frame: false,
		// alwaysOnTop: true,
		// skipTaskbar: true,
		// fullscreen: true,
	});

	const ses = window_.webContents.session;

	console.log("sess", ses.getUserAgent());

	window_.on('ready-to-show', () => {
		window_.show();
	});

	window_.on('closed', () => {
		// Dereference the window
		// For multiple windows store them in an array
		mainWindow = undefined;
	});


	// await window_.loadFile(path.join(__dirname, 'index.html'));

	if (store.get('isLogin') === true) {
		await window_.loadURL('file://' + __dirname + '/pagesX/dashboard.ejs');
	} else {
		await window_.loadURL('file://' + __dirname + '/pagesX/login.ejs');
	}


	ipcMain.on('alert', (event, message) => {
		const result = dialog.showMessageBoxSync({
			title: message.title ?? "Hii",
			type: 'info',
			// buttons: ['OK'],
			detail: message.message,
		});
	})

	// IPC MAIN
	// ipcMain.on('send_mail', (event, message) => {
	// 	console.log("send_mail received renderer");
	// 	console.log(message);
	// 	axios.get(`http://localhost:3001/uom`)
	// 		.then(function (response) {
	// 			console.log(response.data);
	// 		})
	// 		.catch(function (error) {
	// 			console.log("error");
	// 		})
	// 		.finally(function () {
	// 			console.log('finally');
	// 		})
	// })

	// IPC MAIN RETURN



	return window_;
};

// Prevent multiple instances of the app
if (!app.requestSingleInstanceLock()) {
	app.quit();
}
app.on('before-quit', () => {

})

app.on('second-instance', () => {
	if (mainWindow) {
		if (mainWindow.isMinimized()) {
			mainWindow.restore();
		}

		mainWindow.show();
	}
});

app.on('window-all-closed', () => {
	if (!is.macos) {
		app.quit();
	}
});

app.on('activate', async () => {
	if (!mainWindow) {
		mainWindow = await createMainWindow();
	}

});

(async () => {
	await app.whenReady();
	Menu.setApplicationMenu(menu);
	mainWindow = await createMainWindow();

	autoUpdater.checkForUpdates();

	const favoriteAnimal = config.get('favoriteAnimal');
	// mainWindow.webContents.executeJavaScript(`document.querySelector('header p').textContent = 'Your favorite animal is ${favoriteAnimal}'`);
	require("./utils/childWindow.js");
})();


/*New Update Available*/
autoUpdater.on("update-available", (info) => {
	console.log(info);
	// mainWindow.showMessage(`Update available. Current version ${app.getVersion()}`);
	// let pth = autoUpdater.downloadUpdate();
	// mainWindow.showMessage(pth);
});

autoUpdater.on("update-not-available", (info) => {
	console.log(info);
	// mainWindow.showMessage(`No update available. Current version ${app.getVersion()}`);
});

/*Download Completion Message*/
autoUpdater.on("update-downloaded", (info) => {
	console.log(info);
	// mainWindow.showMessage(`Update downloaded. Current version ${app.getVersion()}`);
});

autoUpdater.on("error", (info) => {
	console.log(info);
	// mainWindow.showMessage(info);
});