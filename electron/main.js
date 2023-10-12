// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, Notification } = require("electron");
const exec = require("child_process").exec;
const path = require("path");

const nodeConsole = require("console");
const myConsole = new nodeConsole.Console(process.stdout, process.stderr);
let child;

function printBoth(str) {
  console.log("main.js:    " + str);
  myConsole.log("main.js:    " + str);
}

// Create the browser window.
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 720,
    height: 720,
    resizable: true,
    webPreferences: {
      preload: path.join(__dirname, "gui.js"),
      contextIsolation: true,
      nodeIntegration: true,
    },
  });

  // Load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, "gui.html"));
}

function closeWindow(){
  app.quit();
}

function openWindowOnClick(){
  if(BrowserWindow.getAllWindows.length == 0){
    createWindow();
  }
}

app.on("ready", createWindow);
app.on("window-all-closed", closeWindow);
app.on("activate", openWindowOnClick);
