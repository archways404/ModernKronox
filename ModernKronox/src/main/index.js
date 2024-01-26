/* eslint-disable no-unused-vars */
import { app, shell, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import iconv from 'iconv-lite'

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      contextIsolation: false,
      nodeIntegration: true
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.

// Fetch data from Schema.mau.se
ipcMain.on('perform-action', async (event, arg) => {
  try {
    // prod-test
    /*
    const response = await fetch(
      'https://schema.mau.se/setup/jsp/Schema.jsp?startDatum=today&intervallTyp=m&intervallAntal=6&sprak=EN&sokMedAND=true&forklaringar=true&resurser=p.TGIAA22h'
    )
    */

    // testing
    const response = await fetch(
      'https://schema.mau.se/setup/jsp/Schema.jsp?startDatum=today&slutDatum=2024-01-31&sprak=EN&sokMedAND=true&forklaringar=true&resurser=p.TGIAA22h'
    )
    const buffer = await response.arrayBuffer()
    const body = iconv.decode(buffer, 'utf-8')

    const $ = cheerio.load(body)
    const tableData = []

    $('table')
      .find('tr')
      .each((index, element) => {
        const cells = $(element).find('td')

        // Assuming the first six columns are Dag, Datum, Start-Slut, Kurs.grp, Lokal, Moment
        if (cells.length >= 6) {
          const dag = $(cells[1]).text().trim()
          const datum = $(cells[2]).text().trim()
          const startSlut = $(cells[3]).text().trim()
          const kursGrp = $(cells[4]).text().trim()
          const lokal = $(cells[6]).text().trim()
          const moment = $(cells[8]).text().trim()

          tableData.push({ dag, datum, startSlut, kursGrp, lokal, moment })
        }
      })

    event.reply('action-result', tableData)
    console.log(tableData)
  } catch (error) {
    console.error('Error fetching data:', error)
    event.reply('action-result', 'error')
  }
})
