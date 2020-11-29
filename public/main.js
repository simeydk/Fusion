const path = require("path");
const { app, BrowserWindow, dialog } = require("electron");
const isDev = require("electron-is-dev");
const { merge } = require("./merge");

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 480,
        height: 640,
        frame: false,
        transparent: true,
        resizable: true,
        icon: path.join(__dirname, "../icons/Fusion.ico"),
        webPreferences: {
            devTools: isDev,
            nodeIntegration: true,
        }
    });

    // and load the index.html of the app.
    // win.loadFile("index.html");
    win.loadURL(
        isDev
            ? "http://localhost:3000"
            : `file://${path.join(__dirname, "../build/index.html")}`
    );

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools({ mode: "detach" });
    }
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling
if (require("electron-squirrel-startup")) {
    app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});

app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

const { ipcMain } = require("electron");
ipcMain.on("close-window", (evt, arg) => {
    if (process.platform !== "darwin") {
        app.quit();
    }
    else {
        app.hide();
    }
});

ipcMain.on("minimize-window", (evt, arg) => {
    BrowserWindow.getFocusedWindow().minimize();
});


ipcMain.handle('showSaveDialog', async (event, options) => {
    const result = await dialog.showSaveDialog(BrowserWindow, { filters: [{ name: 'PDF File', extensions: ['PDF'] }], options })
    return result
})

ipcMain.handle('dirname',async (event, fullname) => { 
    return path.dirname(fullname)
})

ipcMain.handle('merge', async (event, inputFiles, outputFile) => {
    return await merge(inputFiles, outputFile)
})