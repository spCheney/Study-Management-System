const AdminController = require('../javascript/controllers/admin_controller');
const fs = require('fs');

class AdminView {
   constructor() {
      this._controller = new AdminController();
   }

   checkIfAdminsExist() {
      if(this.controller.admins.length <= 1) {
         let message = "No admins are saved in this database. Would you like to create one?"
         if(confirm(message)) {
            header.loadPage('new_admin.html');
         }
      }
   }

   get controller() {
      return this._controller;
   }

   checkSignIn() {
      let username = $("#username").val();
      let password = $("#password").val();

      if(this.controller.checkIfAdmin(username, password)) {
         header.admin = true;
         header.loadPage("index.html");
      } else {
         alert("Incorrect username or password");
      }
   }

   addAdmin() {
      let username = $("#username").val();
      let password = $("#password").val();
      let confirmPassword = $("#confirm_password").val();

      if(password != confirmPassword) {
         alert("Passwords don't match.");
      } else {
         this.controller.addAdmin(username, password);
         alert(username + " has been added as Admin.");
      }
   }

   createAdminTable() {
      this.controller.admins.forEach((admin) => {
         let link = 'javascript:header.loadPage(\'edit_admin.html\');' +
            'header.addParam(\'id\', ' + admin.id + ')';
         let row = '<tr><td><a href="' + link + '">' + admin.username + '</a></td></tr>';
         $(row).appendTo("#admin_table");
      })
   }

   editAdmin() {
      let adminId = header.params['id'];
      let currentAdmin = this.controller.find(this.controller.admins, adminId);
      $("#header").text(currentAdmin.username);
   }

   changePassword() {
      let adminId = header.params['id'];

      let password = $("#password").val();
      let confirmPassword = $("#confirm_password").val();

      if(password != confirmPassword) {
         alert("Passwords don't match.");
      } else {
         let currentAdmin = this.controller.changePassword(adminId, password);
         alert(currentAdmin.username + "\'s password has been changed.");
         header.loadPage('admin_list.html');
      }
   }
}
