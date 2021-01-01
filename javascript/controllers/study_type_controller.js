const BaseController = require('../controllers/base_controller');
const StudyType = require("../data_structures/study_type");

module.exports = class StudyTypeController extends BaseController {
   constructor() {
      super();
      this._studyTypes = this.read(StudyType, 'study_types.json');
   }

   get studyTypes() {
      return this._studyTypes;
   }

   getActiveStudyTypes() {
      return this.studyTypes.filter((studyType) => {
         return studyType.active == true;
      });
   }

   updateStudyType(id, name, active, image) {
      let studyTypeIndex = this.studyTypes.findIndex((studyType) => {
         return studyType.id == id;
      });

      this.studyTypes[studyTypeIndex].name = name;
      this.studyTypes[studyTypeIndex].active = active;
      this.studyTypes[studyTypeIndex].image = image;

      this.save(this.studyTypes, 'study_types.json');

      return this.studyTypes[studyTypeIndex];
   }

   addStudyType(name, active, image) {
      this.insert(this.studyTypes, StudyType, [this.getNextId(this.studyTypes), name, active, image]);
      this.save(this.studyTypes, 'study_types.json');
      return this.studyTypes[this.studyTypes.length - 1];
   }

   removeStudyType(studyType) {
      let typeIndex = this.studyTypes.findIndex((type) => {
         return type.id == studyType.id;
      });

      this.studyTypes.splice(typeIndex, typeIndex + 1);

      this.save(this.studyTypes, 'study_types.json');

      return studyType;
   }
}
