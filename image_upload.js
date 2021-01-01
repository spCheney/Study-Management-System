const path = require('path');

exports.uploadImage = (dialog) => {



   var uploadFile = document.getElementById('upload');

   // Defining a Global file path Variable to store
   // user-selected file
   global.filepath = undefined;

   if (process.platform !== 'darwin') {
       // Resolves to a Promise<Object>
       dialog.showOpenDialog({
           title: 'Select the File to be uploaded',
           defaultPath: path.join(__dirname, '../assets/'),
           buttonLabel: 'Upload',
           // Restricting the user to only Text Files.
           filters: [
               {
                  name: 'Text Files',
                  extensions: ['txt', 'docx']
               }, ],
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
             return global.filepath;
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
           filters: [
               {
                  name: 'Text Files',
                  extensions: ['txt', 'docx']
               }, ],
           // Specifying the File Selector and Directory
           // Selector Property In macOS
           properties: ['openFile', 'openDirectory']
       }).then(file => {
           console.log(file.canceled);
           if (!file.canceled) {
             global.filepath = file.filePaths[0].toString();
             console.log(global.filepath);
             return global.filepath;
           }
       }).catch(err => {
           console.log(err)
       });
   }
}
