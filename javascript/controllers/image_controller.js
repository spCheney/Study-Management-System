const DatabaseController = require('./database_controller');
const { ipcRenderer } = require('electron');

module.exports = class ImageController {
   constructor() {
      this._database = new DatabaseController();
      this._defaultImage = '../database/images/image-not-found.jpg';
   }

   get database() {
      return this._database;
   }

   get defaultImageLocation() {
      return this._defaultImage;
   }

   checkIfDirectoryExists(category, id) {
      if(!fs.existsSync(this.database.location + 'images/')) {
         fs.mkdirSync(this.database.location + 'images/');
      }
      if(category != null) {
         if(!fs.existsSync(this.database.location + 'images/' + category + '/')) {
            fs.mkdirSync(this.database.location + 'images/' + category + '/');
         }
      }
      if(id != null) {
         if(!fs.existsSync(this.database.location + 'images/' + category + '/' + id + '/')) {
            fs.mkdirSync(this.database.location + 'images/' + category + '/' + id + '/');
         }
      }
   }

   getImage(path) {
      this.checkIfDirectoryExists();
      if(this.database.location == 'database/') {
         return '../' + this.database.location + 'images/' + path;
      } else {
         return this.database.location + 'images/' + path;
      }
   }

   uploadImage(category, id) {
      this.checkIfDirectoryExists(category, id);
      let imagePath = ipcRenderer.sendSync('upload_image', 'test');
      if(imagePath == null) {
         return false;
      }
      let lastSlash = imagePath.lastIndexOf("/");
      let fileName = imagePath.slice(lastSlash + 1, imagePath.length);
      fs.rename(imagePath, this.database.location + 'images/' + category + '/' + id + '/' + fileName, (err) => {
        if (err) throw err;
        console.log('Rename complete!');
     });
     return fileName;
   }

   deleteImage(path) {
      try {
         fs.unlinkSync(this.database.location + 'images/' + path);
      } catch(err) {
         console.log(err);
         return false;
      }
      return true;

   }
}
