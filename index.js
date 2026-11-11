const { app, BrowserWindow, shell, Menu } = require('electron');
const path = require('node:path');

const GAME_URL = 'https://deadshot.io/';
let mainWindow;
let repaintTimer;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 800,
    minHeight: 600,
    show: false,
    autoHideMenuBar: true,
    backgroundColor: '#101114',
    title: 'Deadshot.io',
    icon: path.join(__dirname, 'assets', 'icons', '256x256.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true
    }
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.maximize();
    mainWindow.show();
  });

  // Refresh the page after the window manager changes the client area.
  const scheduleRepaint = () => {
    clearTimeout(repaintTimer);
    repaintTimer = setTimeout(() => {
      if (mainWindow && !mainWindow.isDestroyed() && !mainWindow.webContents.isDestroyed()) {
        mainWindow.webContents.invalidate();
      }
    }, 150);
  };
  mainWindow.on('resize', scheduleRepaint);
  mainWindow.on('enter-full-screen', scheduleRepaint);
  mainWindow.on('leave-full-screen', scheduleRepaint);

  // Keep the game and its resources in the app; open unrelated links externally.
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') && !isGameHost(url)) shell.openExternal(url);
    return { action: 'deny' };
  });
  mainWindow.webContents.on('will-navigate', (event, url) => {
    if (!isGameHost(url)) {
      event.preventDefault();
      if (url.startsWith('https://')) shell.openExternal(url);
    }
  });

  mainWindow.webContents.on('will-attach-webview', (event) => event.preventDefault());
  mainWindow.loadURL(GAME_URL);
  mainWindow.on('closed', () => { mainWindow = null; });
}

function isGameHost(url) {
  try {
    const host = new URL(url).hostname;
    return host === 'deadshot.io' || host.endsWith('.deadshot.io');
  } catch {
    return false;
  }
}

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  createWindow();
  app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });
});

app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
