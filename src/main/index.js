import { BrowserWindow, Menu, Tray, app, dialog, ipcMain, nativeTheme, shell } from 'electron'
import { join } from 'path'
import fs from 'fs'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS
} from 'electron-devtools-installer'
import {
  apiCore,
  deviceIntegration,
  iFaceManagement,
  iniReader,
  snmpManagement,
  sqlExtensions,
  udpServer,
  windowManagement
} from './modules/index'
import icon from '../../resources/icon.ico?asset'
import MenuBuilder from './menu'
import {
  REQUEST_CHANGE_THEME_MODE,
  REQUEST_HIDE_SHOW_MENU,
  REQUEST_MP_GET_APP_INITIAL_DATA,
  REQUEST_MP_UPDATE_MENU,
  RESPONSE_RP_GET_APP_INITIAL_DATA
} from './utils/IPCEvents'

const rootFolderPath =
  process.env.APPDATA ||
  (process.platform == 'darwin'
    ? process.env.HOME + '/Library/Preferences'
    : process.env.HOME + '/.local/share')
const folderPaths = ['./NMUbackupConfigs']

function deleteFolderRecursive(path) {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const curPath = `${path}/${file}`
      if (fs.lstatSync(curPath).isDirectory()) {
        // recurse
        deleteFolderRecursive(curPath)
      } else {
        // delete file
        fs.unlinkSync(curPath)
      }
    })
    fs.rmdirSync(path)
  }
}

function checkImportFile() {
  try {
    if (!fs.statSync('./_tmp').isDirectory()) {
      fs.unlinkSync('./_tmp')
      return false
    }
    if (!fs.existsSync('./_tmp/db.bak') || !fs.existsSync('./_tmp/ini.bak')) {
      deleteFolderRecursive('./_tmp')
      return false
    }
    fs.copyFileSync('./_tmp/db.bak', './profile.db')
    fs.copyFileSync('./_tmp/ini.bak', './config.ini')
    deleteFolderRecursive('./_tmp')
    return true
  } catch (err) {
    return true
  }
}

let menu
let mainWindow = null
let tray = null

const installExtensionsDev = async () => {
  return installExtension(REDUX_DEVTOOLS)
}

function initialize() {
  app.setAppUserModelId('org.develar.NetworkManagementUtility')
  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  const checkFolders = () => {
    folderPaths.forEach((path1) => {
      if (!fs.existsSync(join(rootFolderPath, path1))) {
        fs.mkdirSync(join(rootFolderPath, path1))
      }
    })
  }

  // creating main windows
  const createWindow = async (loading) => {
    if (is.dev) {
      await installExtensionsDev()
    }

    mainWindow = new BrowserWindow({
      title: 'updated NMU',
      show: false,
      maximizable: false,
      ...(process.platform === 'linux' ? { icon } : { icon }),
      webPreferences: {
        preload: join(__dirname, '../preload/index.js'),
        nodeIntegration: true,
        webviewTag: true,
        contextIsolation: false
      }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      mainWindow.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/index.html`)
    } else {
      mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    windowManagement.default.setWindow({
      winName: 'mainId',
      id: mainWindow.id
    })

    const nimage = icon
    tray = new Tray(nimage)
    const contextMenu = Menu.buildFromTemplate([
      {
        label: 'Open NMU',
        click: () => {
          mainWindow.show()
        }
      },
      {
        label: 'Quit',
        click: () => {
          app.isQuiting = true
          app.quit()
        }
      }
    ])

    tray.setToolTip('Network Management Utility')
    tray.setContextMenu(contextMenu)

    mainWindow.webContents.on('dom-ready', () => {
      try {
        if (!iniReader.default.iniInitialize()) {
          dialog.showErrorBox('ini Error', 'ini config read failed!')
          app.quit()
        }
        console.log('Checking ini...Done')
        deviceIntegration.default.initializeList(true)
      } catch (error) {
        console.error(error)
      }
    })

    mainWindow.webContents.once('dom-ready', () => {
      if (!mainWindow) {
        throw new Error('mainWindow is not defined')
      }
      if (process.env.START_MINIMIZED) {
        mainWindow.minimize()
      } else {
        mainWindow.maximize()
        mainWindow.show()
        mainWindow.focus()
        loading.hide()
        loading.close()
      }
    })

    mainWindow.on('close', (event) => {
      if (!app.isQuiting) {
        event.preventDefault()
        mainWindow.hide()
      }
      return false
    })

    mainWindow.on('closed', () => {
      mainWindow = null
    })

    const menuBuilder = new MenuBuilder(mainWindow)
    menu = menuBuilder.buildMenu()

    mainWindow.setMenuBarVisibility(false)

    mainWindow.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }

  app.commandLine.appendSwitch('ignore-certificate-errors', 'true')
  app
    .whenReady()
    .then(() => {
      checkFolders()
      electronApp.setAppUserModelId('com.electron')
      app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
      })

      const loading = new BrowserWindow({
        show: false,
        frame: false,
        webPreferences: {
          nodeIntegration: true
        }
      })

      loading.once('show', () => {
        setTimeout(() => createWindow(loading), 5000)
      })

      loading.webContents.on('did-finish-load', () => {
        if (!loading) {
          throw new Error('mainWindow is not defined')
        }
        loading.show()
        loading.focus()
      })
      if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        loading.loadURL(`${process.env['ELECTRON_RENDERER_URL']}/splash.html`)
      } else {
        loading.loadFile(join(__dirname, '../renderer/splash.html'))
      }

      app.on('activate', () => {
        if (mainWindow === null) createWindow()
      })
    })
    .catch(console.log)
}

/**
 * Add event listeners...
 */
if (!apiCore.method.calculateChecksum({}, true)) {
  dialog.showErrorBox('Checksum failed', 'Checksum failed!')
  app.exit()
}
if (!checkImportFile()) {
  dialog.showErrorBox('Imported Error', 'Imported failed!')
}
if (!sqlExtensions.default.tableExists()) {
  console.log('Checking table...Done')
}
if (!sqlExtensions.default.isDbExists()) {
  dialog.showErrorBox('Database Error', 'Checking the database failed!')
  app.exit()
} else {
  console.log('Checking database...Done')
  const iFace = iFaceManagement.default.getCurrentNetworkInterface()
  if (!iFace.success) {
    dialog.showErrorBox('NetworkInterface Error', 'Get NetworkInterface data failed!')
    app.exit()
  } else {
    udpServer.default.bind(iFace.data.IPAddress, 55954)
  }
  initialize()
}

ipcMain.on(REQUEST_MP_UPDATE_MENU, (event, arg) => {
  menu.items[arg.position[0]].submenu.items[arg.position[1]].enabled = arg.enabled
})

ipcMain.on(REQUEST_HIDE_SHOW_MENU, (event, arg) => {
  mainWindow.setMenuBarVisibility(arg)
})

ipcMain.on(REQUEST_CHANGE_THEME_MODE, (event, arg) => {
  if (arg === 'dark') {
    nativeTheme.themeSource = 'dark'
  } else {
    nativeTheme.themeSource = 'light'
  }
})

ipcMain.on(REQUEST_MP_GET_APP_INITIAL_DATA, (event) => {
  const appInitialData = {
    SNMP: {
      ...snmpManagement.default.getSNMPInitialData()
    }
  }
  event.sender.send(RESPONSE_RP_GET_APP_INITIAL_DATA, {
    success: true,
    data: { appInitialData }
  })
})
