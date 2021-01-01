if(typeof StudyTypeController == "undefined") {
   var StudyTypeController = require("../javascript/controllers/study_type_controller");
}
if(typeof ImageController == "undefined") {
   var ImageController = require("../javascript/controllers/image_controller");
}

class StudyTypeView {
   constructor() {
      this._controller = new StudyTypeController();
      this._imageController = new ImageController();
      this.loadStudyTypes();
      this.imageController.getImage('image-not-found.jpg');
   }

   get controller() {
      return this._controller;
   }

   get imageController() {
      return this._imageController;
   }

   loadStudyTypes() {
      var row = "";

      this.controller.getActiveStudyTypes().forEach((type, index) => {
         if(index % 3 == 0) {
            if(index != 0) {
               row += '</div><br>';
               $(row).appendTo("#study_type_list");
            }
            row = '<div class="row">';
         }

         let loadPage = 'header.loadPage(\'study_list.html\');' +
            'header.addParam(\'id\', ' + type.id + ')';
         let btnParams = 'class="btn btn-primary typeButton"' +
            'onclick="' + loadPage + '"';
         var image = "";
         if(type.image.length > 0) {
            let path = this.imageController.getImage('Study Type/' + type.id + '/' + type.image);
            console.log(path)
            image = '<img src="' + path + '" class="typeImage">';
         } else {
            image = '<img src="' + this.imageController.defaultImageLocation + '" class="typeImage">';
         }
         row += '<div class="col-md-4">' + image +
            '<button ' + btnParams + '>' + type.name + '</button>' +
         '</div>';
      });
      row += '</div>';
      $(row).appendTo("#study_type_list");

      let viewAllLink = 'header.loadPage(\'study_list.html\')';
      if(header.admin) {
         let finalRow = '<br>' +
            '<div class="row">' +
               '<div class="col-md-3"></div>' +
               '<div class="col-md-2" style="padding: 0px;">' +
                  '<button type="button" name="button" class="btn btn-primary" ' +
                     'style="width: 100%;" onclick="' + viewAllLink + '">' +
                     'View All Studies</button>' +
               '</div>' +
               '<div class="col-md-2"></div>' +
               '<div class="col-md-2" style="padding: 0px;">' +
                  '<button type="button" name="button" class="btn btn-primary"' +
                     'onclick="header.loadPage(\'edit_study_types_list.html\')"' +
                     'style="width: 100%;">Edit Study Types</button>' +
               '</div>' +
            '</div>';
         $(finalRow).appendTo('#study_type_list');
      } else {
         let finalRow = '<br>' +
            '<div class="row">' +
               '<div class="col-md-5"></div>' +
               '<div class="col-md-2" style="padding: 0px;">' +
               '<button type="button" name="button" class="btn btn-primary" ' +
                  'style="width: 100%;" onclick="' + viewAllLink + '">' +
                  'View All Studies</button>' +
               '</div>' +
            '</div>';
         $(finalRow).appendTo('#study_type_list');
      }
   }

   createStudyTypesTable() {
      this.controller.studyTypes.forEach((studyType) => {
         let link = 'javascript:header.loadPage(\'edit_study_type.html\');' +
            'header.addParam(\'id\', ' + studyType.id +');';
         var active = 'No';
         if(studyType.active) {
            active = 'Yes';
         }
         let row = '<tr>' +
            '<td>' +
               '<a href ="' + link + '">' + studyType.name + '</a>' +
            '</td>' +
            '<td>' + active + '</td>' +
         '</tr>';
         $(row).appendTo("#study_types");
      });

      $("#add_btn").click(() => {
         header.loadPage('edit_study_type.html');
      })
   }

   getStudyType() {
      let studyTypeId = header.params['id'];

      if(studyTypeId) {
         let currentStudyType = this.controller.find(this.controller.studyTypes, studyTypeId);

         $("#study_type_header").text("Edit Study Type");
         $("#name").val(currentStudyType.name);
         if(currentStudyType.active) {
            $("#active").val(1);
         } else {
            $("#active").val(0);
         }
         $("#image_file").val(currentStudyType.image);

         $("#save_btn").click(() => {
            let name = $("#name").val();
            let active = $("#active").val();
            let imagePath = $("#image_file").val();
            let studyType = this.controller.updateStudyType(currentStudyType.id, name, active, imagePath);
            alert(studyType.name + " has been updated");
            header.loadPage('index.html');
         });
         if(currentStudyType.image.length > 0) {
            this.startImageInfo(currentStudyType.image, studyTypeId);
         } else {
            this.startUploadBtn(studyTypeId);
         }
         $("#delete_btn").click(() => {
            let removedType = this.controller.removeStudyType(currentStudyType);
            alert(removedType.name + " has been removed.");
            header.loadPage('edit_study_types_list.html');
         });
      } else {
         $("#delete_btn").remove();
         $("#save_btn").click(() => {
            let name = $("#name").val();
            let active = $("#active").val();
            let image = $("#image_file").val();
            let studyType = this.controller.addStudyType(name, active, image);
            alert(studyType.name + " has been added");
            header.loadPage('index.html');
         });
         this.startUploadBtn(studyTypeId);
      }
   }

   startUploadBtn(studyTypeId) {
      $("#upload_btn").click(() => {
         let imageFile = this.imageController.uploadImage("Study Type", studyTypeId);
         this.startImageInfo(imageFile);
      });
      $("#image_file").val("");
      $("#upload_btn_container").removeClass("hide");
      $("#image_info_container").addClass("hide");
   }

   startImageInfo(file, studyTypeId) {
      $("#image_file").val(file);
      $("#change_img_btn").click(() => {
         this.startUploadBtn(studyTypeId);
      })
      $("#image_info_container").removeClass("hide");
      $("#upload_btn_container").addClass("hide");
   }
}
