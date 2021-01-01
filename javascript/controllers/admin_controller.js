const fs = require('fs');

const BaseController = require('../controllers/base_controller');
const Admin = require('../data_structures/admin');

module.exports = class AdminController extends BaseController {
   constructor() {
      super();
      this._admins = this.read(Admin, '/admin.json');
   }

   get admins() {
      return this._admins;
   }

   set admins(x) {
      this._admins = x;
   }

   checkIfAdmin(username, password) {
      return this.admins.some((admin) => {
         return (admin.username == username && admin.password == password);
      });
   }

   addAdmin(username, password) {
      this.insert(this.admins, Admin, [this.getNextId(this.admins), username, password]);
      this.save(this.admins, 'admin.json');
   }

   changePassword(adminId, password) {
      let currentAdminIndex = this.admins.findIndex((admin) => {
         return admin.id == adminId;
      });

      this.admins[currentAdminIndex].password = password;

      this.save(this.admins, 'admin.json');

      return this.admins[currentAdminIndex];
   }
}
