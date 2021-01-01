const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');

function createWindow () {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the index.html of the app.
  win.loadFile('./pages/header.html')

}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow)

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
// const upload = require('./image_upload');
ipcMain.on('upload_image', (event, arg) => {
   // console.log(ImageUpload)
   // let imagePath = upload.uploadImage(dialog);
   // global.filepath = undefined;

   if (process.platform !== 'darwin') {
       // Resolves to a Promise<Object>
       dialog.showOpenDialog({
           title: 'Select the File to be uploaded',
           defaultPath: path.join(__dirname, '../assets/'),
           buttonLabel: 'Upload',
           // Restricting the user to only Text Files.
           // filters: [
           //     {
           //        name: 'Text Files',
           //        extensions: ['txt', 'docx']
           //     }, ],
           // Specifying the File Selector Property
           properties: ['openFile']
       }).then(file => {
           // Stating whether dialog operation was
           // cancelled or not.
           console.log(file.canceled);
           if (!file.canceled) {
             // Updating the GLOBAL filepath variable
             // to user-selected file.
             global.filepath = file.filePaths[0].toString();
             console.log(global.filepath);
             event.returnValue = global.filepath;
           }
       }).catch(err => {
           console.log(err)
       });
   }
   else {
       // If the platform is 'darwin' (macOS)
       dialog.showOpenDialog({
           title: 'Select the File to be uploaded',
           defaultPath: path.join(__dirname, '../assets/'),
           buttonLabel: 'Upload',
           // filters: [
           //     {
           //        name: 'Text Files',
           //        extensions: ['txt', 'docx']
           //     }, ],
           // Specifying the File Selector and Directory
           // Selector Property In macOS
           properties: ['openFile', 'openDirectory']
       }).then(file => {
           console.log(file.canceled);
           if (!file.canceled) {
             global.filepath = file.filePaths[0].toString();
             console.log(global.filepath);
             event.returnValue = global.filepath;
           }
       }).catch(err => {
           console.log(err)
       });
   }   
})
