const { app, BrowserWindow } = require('electron');
const path = require('path');  // Import the path module

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });

    // Use path.join to get the absolute path to index.html
    mainWindow.loadFile(path.join(__dirname, '../react/index.html'));

    // Open the DevTools (optional)
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', function () {
        mainWindow = null;
    });
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', function () {
    if (mainWindow === null) createWindow();
});
