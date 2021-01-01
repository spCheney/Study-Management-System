const BaseController = require('../controllers/base_controller');
const StudyType = require('../data_structures/study_type');
const Study = require("../data_structures/study");

module.exports = class StudyController extends BaseController {
   constructor() {
      super();
      this._studies = this.read(Study, 'study.json');
      this._studyTypes = this.read(StudyType, 'study_types.json');
   }

   get studies() {
      return this._studies;
   }

   get studyTypes() {
      return this._studyTypes;
   }

   get type() {
      return this._type;
   }

   setType(id) {
      this._type = this.find(this.studyTypes, id);
   }

   getType(id) {
      return this.find(this.studyTypes, id);
   }

   sortByType(typeId) {
      this.setType(typeId);
      return this.studies.filter((study) => {
         return study.studyTypes.includes(this.type.id);
      });
   }

   getStudy(id) {
      let study = this.find(this.studies, id);
      return study;
   }

   newStudy() {
      return new Study();
   }

   updateStudy(studyChanges) {
      let studyIndex = this.studies.findIndex((study) => {
         return study.id == studyChanges.id;
      });

      this.studies[studyIndex] = studyChanges;

      this.save(this.studies, 'study.json');

      return this.studies[studyIndex];
   }

   insertStudy(studyValues) {
      studyValues.id = this.getNextId(this.studies)
      this.insert(this.studies, Study, Object.values(studyValues));
      this.save(this.studies, 'study.json');
      return this.studies[this.studies.length - 1];
   }

   removeStudy(study) {
      let studyIndex = this.studies.findIndex((study) => {
         return study.id == studyChanges.id;
      });

      this.studies.splice(studyIndex, studyIndex + 1);

      this.save(this.studies, 'study.json');

      return study;
   }
}
