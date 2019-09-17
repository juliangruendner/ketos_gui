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
import { ResourceLoader } from '@angular/compiler';
import { AuthenticationService } from "../core/authentication/authentication.service";

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
  ketosUrl: string = location.origin

  create_env_id: number;
  create_description: string;

  assign_feature_set: number;

  patient_ids: string;

  predictionResult: any;
  show_spinner: boolean;
  
  uploader_url : string = "/api/models/import";
  uploader: FileUploader = new FileUploader({});

  uploadInProgress: boolean = false;
  modelFile: File;


  constructor(private mlModelsService: MLModelsService, private environmentsService: EnvironmentsService, private featureSetsService: FeatureSetsService, private authService : AuthenticationService) { }

  ngOnInit() {
    this.mlModelsService.getAll().subscribe(resp => {
      this.mlmodels = resp;
    });
    this.show_spinner = false;
    this.uploader = new FileUploader({});
  }


  copyModelUrl(model: MLModel){
    
    if(model.feature_set_id == 0){
        var modelUrl = location.origin + environment.serverUrl + "/models/" + model.id + "/prediction?ownInputData=True&writeToFhir=False"
    } else{
        var modelUrl = location.origin + environment.serverUrl + "/models/" + model.id + "/prediction?ownInputData=False&writeToFhir=False"
    }
 
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

  deleteModel(m : MLModel){

    this.mlModelsService.delete(m.id).subscribe(resp =>{
        console.log(resp.id)
        console.log(this.mlmodels)
        
        for(var i = 0; i < this.mlmodels.length; i++){
            if(this.mlmodels[i].id == resp.id){
              var rem = this.mlmodels.splice(i,1)
              console.log(rem)
            }
        }
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
    m.feature_set_id = this.assign_feature_set
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

  getPrediction() {
    this.show_spinner = true
    var patientIds: PatientIDs = new PatientIDs();
    if(this.patient_ids != undefined){
        let stringArray = this.patient_ids.split(',');
        patientIds.patient_ids = parseInt(stringArray[0]);
    } else {
        patientIds.patient_ids = 0
    }

    //for(var i = 0; i < stringArray.length; i++) {
      //patientIds.patient_ids.push(parseInt(stringArray[i]));
    //} 

    
    var ownInputData : boolean = (this.mlmodel.feature_set_id == 0)  ? true : false;
    this.mlModelsService.predict(this.mlmodel.id, patientIds, ownInputData).subscribe(resp => {
      this.show_spinner = false
      this.predictionResult = JSON.stringify(resp.prediction, null, 2);
        console.log("success")
    }, err => {
      this.show_spinner = false
      this.predictionResult = 'something went Wrong!'
      console.log("ERROR")
    });
  } 

  initTest(mlmodel: MLModel) {
    this.patient_ids = this.predictionResult = null;
    this.setMlModel(mlmodel);
  }

  exportModel(mlmodel: MLModel){

    this.mlModelsService.prepare_export(mlmodel.id).subscribe(resp => {
        console.log("success")  
        this.mlModelsService.export(mlmodel.id);    
      }, err => {
        console.log("ERROR")
        console.log(err)
      });
    
    
  }

  onChange(event: { srcElement: { files: File; }; }) {
    this.modelFile = event.srcElement.files[0];
  }

  importModel(env_id: number, feature_set_id: number){

    this.uploadInProgress = true;
    this.mlModelsService.import(this.modelFile, env_id, feature_set_id).subscribe((data: any) => {
        console.log(data)
        this.uploadInProgress = false;
      }, error => {
        console.log("upload failed")
        this.uploadInProgress = false;
        //this.error = error.error.message;
      });
    //this.uploader_url = "http://localhost:5000/models/import"
    //auth = btoa(auth)
    //this.uploader.setOptions({url: this.uploader_url + "?environment_id=" + env_id + "&feature_set_id=" + feature_set_id,authToken: auth, itemAlias: "file"});
    //this.uploader.uploadAll();
    
  }




}
