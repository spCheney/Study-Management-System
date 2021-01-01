const DatabaseController = require('../javascript/controllers/database_controller');

class DatabaseView {
   constructor() {
      this._controller = new DatabaseController();
      if(this.controller.location == "database/") {
         $("#location").val("Default Path");
      } else {
         $("#location").val(this.controller.location);
      }
      $("#save_btn").click(() => {
         this.controller.location = $("#location").val();
         this.controller.checkLocation();
         this.controller.saveLocation();
      });
   }

   get controller() {
      return this._controller;
   }
}
