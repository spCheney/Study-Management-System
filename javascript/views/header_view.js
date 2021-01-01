let $ = require('jquery');
require('popper.js');
require('bootstrap');

console.log(__dirname)

if(typeof StudyTypeController == "undefined") {
   var StudyTypeController = require("../javascript/controllers/study_type_controller");
}



class HeaderView {
   constructor() {
      this._controller = new StudyTypeController();
      this._admin = false;
      this._params = new Map();
      $(document).ready(() => {
         this.loadPage("index.html");
         this.loadDefault();
      })
   }

   get controller() {
      return this._controller;
   }

   get admin() {
      return this._admin;
   }

   set admin(x) {
      if(typeof x == "boolean") {
         this._admin = x;
      } else {
         if(x == "true") {
            this._admin = true;
         } else {
            this._admin = false;
         }
      }
   }

   get params() {
      return this._params;
   }

   logout() {
      this.admin = false;
      this.loadPage('index.html');
   }

   addParam(key, value) {
      this.params[key] = value;
   }

   clearParams() {
      this._params = new Map();
   }

   loadPage(html) {
      $("#content").empty();
      this.clearParams();
      $("#content").load(html);
   }

   loadDropdown() {
      $("#dropdown_icon").remove();
      let dropdownIcon = '<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots-vertical" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="dropdown_open">' +
         '<path fill-rule="evenodd" d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>' +
      '</svg>';
      $(dropdownIcon).appendTo("#dropdown_container");

      $("#dropdown_open").hover(() => {
         $("#dropdown_open").css("color", "black");
      }, () => {
         $("#dropdown_open").css("color", "inherit");
      });

      let dropdown = '<div style="position: absolute; top: 40px; right: 0px; width: 150px; background-color: #7d7d7d; border-radius: 0 0 0 5px; padding-left: 5px; z-index: 2;" id="dropdown">';
      header.controller.studyTypes.forEach((type) => {
         let loadPage = 'javascript:header.loadPage(\'study_list.html\');' +
            'header.addParam(\'id\', ' + type.id + ');' +
            'header.revertToDefault()';
         dropdown += '<a href="' + loadPage + '" class="solid">' + type.name + '</a><br>';
      });
      if(this.admin) {
         let loadPage = 'javascript:header.loadPage(\'admin_list.html\');' +
            'header.revertToDefault();';
         dropdown += '<a href="' + loadPage + '" class="solid">View Admin</a><br>';
         loadPage = 'javascript:header.loadPage(\'database_mng.html\');' +
            'header.revertToDefault();';
         dropdown += '<a href="' + loadPage + '" class="solid">Manange Database</a><br>';
         loadPage = 'javascript:header.logout();' +
            'header.revertToDefault();';
         dropdown += '<a href="' + loadPage + '" class="solid">Logout</a></div>';
      } else {
         let loadPage = 'javascript:header.loadPage(\'sign_in.html\');' +
            'header.revertToDefault();';
         dropdown += '<a href="' + loadPage + '" class="solid">Sign In</a></div>';
      }
      $(dropdown).appendTo("#dropdown_container");

      $("#dropdown_open").click(() => {
         this.revertToDefault();
      });
   }

   revertToDefault() {
      $("#dropdown_open").remove();
      $("#dropdown").remove();
      this.loadDefault();
   }

   loadDefault() {
      let dropdownIcon = '<svg width="2em" height="2em" viewBox="0 0 16 16" class="bi bi-three-dots" fill="currentColor" xmlns="http://www.w3.org/2000/svg" id="dropdown_icon">' +
         '<path fill-rule="evenodd" d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/>' +
       '</svg>';
      $(dropdownIcon).appendTo("#dropdown_container");
      $("#dropdown_icon").hover(() => {
         $("#dropdown_icon").css("color", "black");
      }, () => {
         $("#dropdown_icon").css("color", "inherit");
      });

      $("#dropdown_icon").click(() => {
         this.loadDropdown();
      });
   }
}

let header = new HeaderView();
