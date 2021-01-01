const fs = require('fs');
const DatabaseController = require('./database_controller')

module.exports = class BaseController {
   constructor() {
      this._database = new DatabaseController();
   }

   get database() {
      return this._database;
   }

   read(object, path) {
      let array = [];
      //reads the data
      let rawData = fs.readFileSync(this.database.location + path);
      //turns it into a json object
      let data = JSON.parse(rawData);
      //turns json into array of specified objects
      data.forEach((obj) => {
         this.insert(array, object, Object.values(obj));
      });
      return array;
   }

   insert(array, object, parameters) {
      array.push(new object(parameters));
   }

   find(array, id) {
      return array.find((obj) => {
         return obj.id == id;
      });
   }

   getNextId(array) {
      return array[array.length - 1].id + 1;
   }

   save(array, path) {
      fs.writeFile(this.database.location + path, JSON.stringify(array, null, 2), (err) => {
         if(err) {
            console.log("Error:" + err);
         }
      });
   }
}
