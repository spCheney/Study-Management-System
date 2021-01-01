module.exports = class Study {
   constructor(id, name, studyTypes, description, summary, length, age,
      compensation, status, image, inclusions, exclusions) {
      if(id != null && id.length > 1) {
         name = id[1];
         studyTypes = id[2];
         description = id[3];
         summary = id[4];
         length = id[5];
         age = id[6];
         compensation = id[7];
         status = id[8];
         image = id[9];
         inclusions = id[10];
         exclusions = id[11];
         id = id[0];
      }

      if(id == null) {
         this._id = 0;
      } else {
         this._id = parseInt(id);
      }

      this._name = name;

      // if(studyTypeId == null) {
      //    this._studyTypeId = 0;
      // } else {
      //    this._studyTypeId = parseInt(studyTypeId);
      // }
      this._studyTypes = studyTypes;

      this._description = description;

      this._summary = summary;

      if(length == null) {
         this._length = 0;
      } else {
         this._length = parseInt(length);
      }

      if(age == null) {
         this._age = 0;
      } else {
         this._age = parseInt(age);
      }

      this._compensation = compensation;

      this._status = status;

      this._image = image;

      this._inclusions = inclusions;

      this._exclusions = exclusions;
   }

   get id() {
      return this._id;
   }

   set id(x) {
      this._id = parseInt(x);
   }

   get name() {
      return this._name
   }

   set name(x) {
      this._name = x;
   }

   get studyTypes() {
      return this._studyTypes;
   }

   set studyTypes(x) {
      this._studyTypes = x;
   }

   get description() {
      return this._description;
   }

   set description(x) {
      this._description = x;
   }

   get summary() {
      return this._summary;
   }

   set summary(x) {
      this._summary = x;
   }

   get length() {
      return this._length;
   }

   set length(x) {
      this._length = parseInt(x);
   }

   get age() {
      return this._age;
   }

   set age(x) {
      this._age = parseInt(x);
   }

   get compensation() {
      return this._compensation;
   }

   set compensation(x) {
      this._compensation = x;
   }

   get status() {
      return this._status;
   }

   set status(x) {
      this._status = x;
   }

   get image() {
      return this._image;
   }

   set image(x) {
      this._image = x;
   }

   get inclusions() {
      return this._inclusions;
   }

   set inclusions(x) {
      this._inclusions = x;
   }

   get exclusions() {
      return this._exclusions;
   }

   set exclusions(x) {
      this._exclusions = x;
   }
}
