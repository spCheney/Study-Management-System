const fs = require('fs');

module.exports = class DatabaseController {
   constructor() {
      let data = fs.readFileSync('database/database_info.json')
      this.location = JSON.parse(data).location;
      fs.openSync('test.json', 'w');
   }

   get location() {
      return this._location;
   }

   set location(x) {
      this._location = x;
   }

   saveLocation() {
      let locationObj = {
         location: this.location
      }
      fs.writeFile('database/database_info.json', JSON.stringify(locationObj, null, 2), (err) => {
         if(err) {
            console.log("Error:" + err);
         }
      });
   }

   checkLocation() {
      if(!fs.existsSync(this.location + 'study.json')) {
         fs.openSync(this.location + 'study.json', 'w');
         fs.writeFile(this.location + 'study.json', '[]', (err) => {
            if(err)
               console.log("Error:" + err);
         });
      }
      if(!fs.existsSync(this.location + 'admin.json')) {
         fs.openSync(this.location + 'admin.json', 'w');
         let admin = [];
         let baseAdmin = {
            id: 1,
            username:"scheney",
            password:"I4gotit!"
         }
         admin.push(baseAdmin);
         fs.writeFile(this.location + 'admin.json', JSON.stringify(admin, null, 2), (err) => {
            if(err)
               console.log("Error:" + err);
         });
      }
      if(!fs.existsSync(this.location + 'study_types.json')) {
         fs.openSync(this.location + 'study_types.json', 'w');
         fs.writeFile(this.location + 'study_types.json', '[]', (err) => {
            if(err)
               console.log("Error:" + err);
         });
      }
   }
}
