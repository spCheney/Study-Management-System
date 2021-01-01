module.exports = class StudyType {
   constructor(id, name, active, image) {
      if(id.length > 1) {
         name = id[1];
         active = id[2];
         image = id[3];
         id = id[0];
      }
      if(id == null) {
         this._id = 0;
      } else {
         this._id = parseInt(id);
      }

      this._name = name;

      if(typeof active == "boolean") {
         this._active = active;
      } else if(typeof active == "number") {
         this._active = Boolean(active);
      } else if(typeof active == "string") {
         this._active = Boolean(parseInt(active));
      } else {
         this._active = false;
      }

      this._image = image;
   }

   get id() {
      return this._id;
   }

   set id(x) {
      this._id = parseInt(x);
   }

   get name() {
      return this._name;
   }

   set name(x) {
      this._name = x;
   }

   get active() {
      return this._active;
   }

   set active(x) {
      this._active = Boolean(parseInt(x));
   }

   get image() {
      return this._image;
   }

   set image(x) {
      this._image = x;
   }
}
