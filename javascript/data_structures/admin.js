module.exports = class Admin {
   constructor(id, username, password) {
      if(id.length > 1) {
         username = id[1];
         password = id[2];
         id = id[0];
      }

      if(id == null) {
         this._id = 0;
      } else {
         this._id = parseInt(id);
      }

      this._username = username;

      this._password = password;
   }

   get id() {
      return this._id;
   }

   set id(x) {
      this._id = parseInt(x);
   }

   get  username() {
      return this._username;
   }

   set username(x) {
      this._username = x;
   }

   get password() {
      return this._password;
   }

   set password(x) {
      this._password = x;
   }
}
