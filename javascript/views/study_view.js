const StudyController = require('../javascript/controllers/study_controller');
if(typeof ImageController == "undefined") {
   var ImageController = require("../javascript/controllers/image_controller");
}

class StudyView {
   constructor() {
      this._controller = new StudyController();
      this._imageController = new ImageController();
   }

   get controller() {
      return this._controller;
   }

   get imageController() {
      return this._imageController;
   }

   createStudyList() {
      var typeId = header.params['id'];

      $("#status").change(() => {
         $("#study_list").empty();
         this.createStudyList();
      });

      let status = $("#status").val();

      var filteredStudies;
      if(typeId) {
         filteredStudies = this.controller.sortByType(typeId).filter((study) => {
            return study.status == status;
         });

         $("#header").text(this.controller.type.name);
      } else {
         filteredStudies = this.controller.studies.filter((study) => {
            return study.status == status;
         });

         $("#header").text("All Studies");
      }

      if(header.admin) {
         let link = 'header.loadPage(\'edit_study.html\');' +
            'header.addParam(\'typeId\', ' + typeId + ')';
         let addBtn = '<button class="btn btn-primary" onclick="' + link +
            '" id="add_btn">Add New Study</button>';
         $(addBtn).appendTo("#options");
      }

      filteredStudies.forEach((study) => {
         let loadPage = 'javascript:header.loadPage(\'study.html\');' +
            'header.addParam(\'id\', ' + study.id + ')';
         var image = "";
         if(study.image.length > 0) {
            let path = this.imageController.getImage('Study/' + study.id + '/' + study.image);
            image = '<img src="' + path + '" class="studyListImage">';
         } else {
            image = '<img src="' + this.imageController.defaultImageLocation + '" class="studyListImage">';
         }
         var studySection = '<div class="row">';
         if(study.image.length > 0) {
            studySection += '<div>' + image + '</div>' +
            '<div class="col-md-6 studyListContainerImage">';
         } else {
            studySection += '<div class="col-md-6 studyListContainerNoImage">';
         }
         studySection += '<div class="row">' +
                  '<a href="' + loadPage + '" class="studyListHeader">' + study.name + '</a>' +
               '</div>' +
               '<div class="row">' +
                  '<p class="studyListText">' + study.description + '</p>' +
               '</div>' +
            '</div>' +
         '</div>';

         $(studySection).appendTo("#study_list");
      });
   }

   getStudy() {
      var studyId = header.params['id'];
      let study = this.controller.getStudy(studyId);

      if(header.admin) {
         let link = "header.loadPage(\'edit_study.html\');" +
            'header.addParam(\'id\', ' + study.id + ')';
         let editBtn = '<button class="btn btn-primary" onclick="' + link +
            '">Edit Study</button><br><br>';
         $(editBtn).appendTo("#edit_btn");
      }

      if(study.image.length > 0) {
         let path = this.imageController.getImage('Study/' + study.id + '/' + study.image);
         $("#image").attr("src", path);
         $("#image").width($("body").width());
         $("#header_container").addClass("studyHeaderImage");
      } else {
         $("#image").remove();
      }

      $("#header").text(study.name);
      $("#summary").text(study.summary);
      var types = "";
      study.studyTypes.forEach((typeId, index) => {
         if(index != 0) {
            types += ", ";
         }
         types += this.controller.getType(typeId).name;
      })
      $("#type").text(types);
      $("#length").text(study.length + " weeks");
      $("#age").text(study.age + " years old");
      $("#compensation").text(study.compensation);
      $("#status").text(study.status);
      $("#description").text(study.description);
      $("#inclusions").text(study.inclusions);
      $("#exclusions").text(study.exclusions);

      $("#study_name_input").val(study.name);
   }

   createStudyTypeList(selected) {
      let list = '<select class="form-box">';
      if (selected == 0) {
         let defaultOption = '<option selected>remove</option>';
         list += defaultOption;
      } else {
         let defaultOption = '<option>remove</option>';
         list += defaultOption;
      }
      this.controller.studyTypes.forEach((type) => {
         if(type.id == selected) {
            let option = '<option value=' + type.id + ' selected>' + type.name + '</option>';
            list += option
         } else {
            let option = '<option value=' + type.id + '>' + type.name + '</option>';
            list += option
         }
      });
      list += '</select>';
      $(list).appendTo("#study_types_container");
   }

   editStudy() {
      let defaultOption = '<option disabled selected>Select the Study Type</option>';
      $(defaultOption).appendTo("#study_types");
      this.controller.studyTypes.forEach((type) => {
         let option = '<option value=' + type.id + '>' + type.name + '</option>';
         $(option).appendTo("#study_types")
      });

      $("#add_study_type").click(() => {
         this.createStudyTypeList(0)
      });

      let studyId = header.params['id'];
      if(studyId) {
         $("#save_btn").click(() => {
            let studyChanges = this.getValues();
            studyChanges.id = study.id;
            if(!Boolean(parseInt($("#attach_image").val())) && study.image.length > 0) {
               let deleteSuccess = this.imageController.deleteImage('Study/' + study.id + '/' + study.image);
               if(deleteSuccess) {
                  studyChanges.image = "";
               } else {
                  alert("Image couldn't be deleted properly.");
               }
            }
            let newStudy = this.controller.updateStudy(studyChanges);
            alert(newStudy.name + " has been updated.");
            header.loadPage('study_list.html');
            header.addParam('id', newStudy.studyTypeId);
         });
         $("#delete_btn").click(() => {
            let removedStudy = this.controller.removeStudy(study);
            alert(removedStudy + " has been removed.");
            header.loadPage('study_list.html');
            header.addParam('id', removedStudy.studyTypeId);
         });
         $("#cancel_btn").click(() => {
            header.loadPage('study.html');
            header.addParam('id', studyId);
         });
         $("#header").text("Edit Study");
         let study = this.controller.getStudy(studyId);
         $("#name").val(study.name);
         $("#summary").val(study.summary);
         study.studyTypes.forEach((typeId, index) => {
            if(index == 0) {
               $("#study_types").val(typeId);
            } else {
               this.createStudyTypeList(typeId);
            }
         });

         $("#length").val(study.length);
         $("#age").val(study.age);
         $("#compensation").val(study.compensation);
         $("#status").val(study.status);
         $("#description").val(study.description);
         $("#inclusions").val(study.inclusions);
         $("#exclusions").val(study.exclusions);

         if(study.image.length > 0) {
            $("#attach_image").val(1);
            this.startImageInfo(study.image, studyId);
         }
      } else {
         $("#delete_btn").remove();
         $("#save_btn").click(() => {
            let studyValues = this.getValues();
            let newStudy = this.controller.insertStudy(studyValues);
            alert(newStudy.name + " has been added.");
            header.loadPage('study_list.html');
            header.addParam('id', newStudy.studyTypeId);
         });
         let typeId = header.params['typeId'];
         $("#cancel_btn").click(() => {
            header.loadPage('study_list.html');
            header.addParam('id', typeId);
         });
         $("#study_types").val(typeId);
      }

      $("#attach_image").change(() => {
         if(Boolean(parseInt($("#attach_image").val()))) {
            if($("#image_file").val().length > 0) {
               this.startImageInfo($("#image_file").val(), studyId);
            } else {
               this.startUploadBtn(studyId);
            }
         } else {
            $("#image_info_container").addClass("hide");
            $("#upload_btn_container").addClass("hide");
         }
      });
   }

   getValues() {
      let array = this.getStudyTypeValues();
      console.log(array)
      let study = this.controller.newStudy();
      study.name = $("#name").val();
      study.summary = $("#summary").val();
      study.studyTypes = array;
      study.length = $("#length").val();
      study.age = $("#age").val();
      study.compensation = $("#compensation").val();
      study.status = $("#status").val();
      study.description = $("#description").val();
      study.image = $("#image_file").val();
      study.inclusions = $("#inclusions").val();
      study.exclusions = $("#exclusions").val();
      return study;
   }

   getStudyTypeValues() {
      let studyTypes = [];
      console.log($("#study_types_container").children())
      $("#study_types_container").children().each((index, element) => {
         studyTypes.push(parseInt(element.value));
      });
      return studyTypes;
   }

   startUploadBtn(studyId) {
      $("#upload_btn").click(() => {
         let imageFile = this.imageController.uploadImage("Study", studyId);
         this.startImageInfo(imageFile);
      });
      $("#image_file").val("");
      $("#upload_btn_container").removeClass("hide");
      $("#image_info_container").addClass("hide");
   }

   startImageInfo(file, studyId) {
      $("#image_file").val(file);
      $("#change_img_btn").click(() => {
         this.startUploadBtn(studyId);
      })
      $("#image_info_container").removeClass("hide");
      $("#upload_btn_container").addClass("hide");
   }
}
