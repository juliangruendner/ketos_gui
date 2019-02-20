import { Component, OnInit } from '@angular/core';
import { MLModel } from '../models/mlmodel.model';
import { MLModelsService } from '../services/mlmodel.service';
import { EnvironmentsService } from '../services/environments.service';
import { Environment } from '../models/environment.model';
import { FeatureSetsService } from '../services/featuresets.service';
import { FeatureSet } from '../models/featureSets.model';
import { PatientIDs } from '../models/patientIds.model';
import { FileUploader } from 'ng2-file-upload';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-mlmodels',
  templateUrl: './mlmodels.component.html',
  styleUrls: ['./mlmodels.component.scss']
})
export class MlmodelsComponent implements OnInit {

  mlmodels: MLModel[] = []
  mlmodel: MLModel = new MLModel();
  envs: Environment[] = []
  featureSets: FeatureSet[] = []

  create_env_id: number;
  create_description: string;

  assign_feature_set: number;

  patient_ids: string;

  testStr: any;
  show_spinner: boolean;
  
  uploader_url : string = "/brain/models/import";
  uploader: FileUploader = new FileUploader({});


  constructor(private mlModelsService: MLModelsService, private environmentsService: EnvironmentsService, private featureSetsService: FeatureSetsService) { }

  ngOnInit() {
    this.mlModelsService.getAll().subscribe(resp => {
      this.mlmodels = resp;
      console.log(this.mlmodels)
    });
    this.show_spinner = false;
    this.uploader = new FileUploader({});
  }


  copyModelUrl(model: MLModel){
      
    var modelUrl = "" + environment.serverUrl + "/models/" + model.id + "/prediction?ownInputData=True&writeToFhir=False"

    console.log(modelUrl)
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = modelUrl;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  clearCreateInput() {
    this.create_env_id = this.create_description = null;
  }

  getEnvs() {
    this.environmentsService.getAll().subscribe(resp => {
      this.envs = resp;
    });
  }

  getFeatureSets() {
    this.featureSetsService.getAll().subscribe(resp => {
      this.featureSets = resp;
    });
  }

  create() {
    var model = new MLModel();
    model.environment_id = this.create_env_id;
    model.name = " ";
    model.description = this.create_description;
    this.mlModelsService.post(model).subscribe(resp => {
      this.mlmodels.push(resp);
    });
  }

  clearAssignData() {
    this.assign_feature_set = null;
  }

  setMlModel(mlmodel: MLModel) {
    this.mlmodel = mlmodel;
  }

  assignFeatureSet() {
    var m = Object.assign({}, this.mlmodel);
    m.feature_set_id = this.assign_feature_set;
    this.mlModelsService.put(this.mlmodel.id, m).subscribe(resp => {
      for(var i = 0; i < this.mlmodels.length; i++) {
        if(resp.id == this.mlmodels[i].id) {
          this.mlmodels[i] = resp;
          this.mlmodel = null;
          break;
        }
      }
    });
  }

  initCreate() {
    this.clearCreateInput();
    this.getEnvs();
  }

  initAssign(mlmodel: MLModel) {
    this.clearAssignData();
    this.getFeatureSets();
    this.setMlModel(mlmodel);
  }

  initImport(){
    this.getFeatureSets();
    this.getEnvs();
  }

  test() {
    this.show_spinner = true
    var patientIds: PatientIDs = new PatientIDs();
    let stringArray = this.patient_ids.split(',');
    patientIds.patient_ids = parseInt(stringArray[0]);
    //for(var i = 0; i < stringArray.length; i++) {
      //patientIds.patient_ids.push(parseInt(stringArray[i]));
    //} 
    

    this.mlModelsService.predict(this.mlmodel.id, patientIds).subscribe(resp => {
      console.log(resp)
      this.show_spinner = false
      this.testStr = JSON.stringify(resp.prediction, null, 2);

    }, err => {
      this.show_spinner = false
      this.testStr = 'we are sorry, but it seems that the ml-model does not like you!'
    });
  }

  initTest(mlmodel: MLModel) {
    this.patient_ids = this.testStr = null;
    this.setMlModel(mlmodel);
  }

  exportModel(mlmodel: MLModel){
    this.mlModelsService.export(mlmodel.id);
  }

  importModel(env_id: number, feature_set_id: number){
    // this.uploader.options.url = this.uploader_url + "?environment_id=" + env_id + "&feature_set_id=" + feature_set_id;
    // this.uploader.options.itemAlias = "file";
    this.uploader.setOptions({url: this.uploader_url + "?environment_id=" + env_id + "&feature_set_id=" + feature_set_id, itemAlias: "file" });
    this.uploader.uploadAll();
    
  }




}
