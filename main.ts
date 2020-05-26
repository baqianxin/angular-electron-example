import { app, BrowserWindow, screen, Menu } from 'electron';

import installExtension, {
  EMBER_INSPECTOR, REACT_DEVELOPER_TOOLS,
  BACKBONE_DEBUGGER, JQUERY_DEBUGGER,
  ANGULARJS_BATARANG, VUEJS_DEVTOOLS,
  REDUX_DEVTOOLS, REACT_PERF,
  CYCLEJS_DEVTOOL, MOBX_DEVTOOLS,
  APOLLO_DEVELOPER_TOOLS,
} from 'electron-devtools-installer';
import * as path from 'path';
import * as url from 'url';
import * as os from 'os';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {

  const electronScreen = screen;
  const size = electronScreen.getPrimaryDisplay().workAreaSize;
  // Create the browser window.
  win = new BrowserWindow({
    backgroundColor: '#fff',
    x: size.width * 0.3 / 2,
    y: size.height * 0.3 / 2,
    width: size.width * 0.7,
    height: size.height * 0.7,
    // 边框隐藏
    frame: false,
    // 隐藏MAC标题
    titleBarStyle: 'hidden',
    // 固定宽高
    resizable: false,

    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: (serve) ? true : false,
    },
  });
  // 设置扩展
  if (serve) {
    require('devtron').install();
    win.webContents.openDevTools({
      mode: 'detach', activate: true
    });
    require('electron-reload')(__dirname, {
      electron: require(`${__dirname}/node_modules/electron`)
    });
    win.loadURL('http://localhost:4200');

  } else {
    win.loadURL(url.format({
      pathname: path.join(__dirname, 'dist/index.html'),
      protocol: 'file:',
      slashes: true
    }));
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {

  app.allowRendererProcessReuse = true;

  // 设置 Mac-Dock
  const dockMenu = Menu.buildFromTemplate([
    {
      label: 'New Window',
      click() { console.log('New Window') }
    }, {
      label: 'New Window with Settings',
      submenu: [
        { label: 'Basic' },
        { label: 'Pro' }
      ]
    },
    { label: 'New Command...' }
  ])

  app.dock.setMenu(dockMenu)
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  app.whenReady().then(() => {
    installExtension(ANGULARJS_BATARANG)
      .then((name) => console.log(`Added Extension:  ${name}`))
      .catch((err) => console.log('An error occurred: ', err));
  });

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });

} catch (e) {
  // Catch Error
  // throw e;
}
