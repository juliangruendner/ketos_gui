import { Component, OnInit } from '@angular/core';
import { MLModel } from '../models/mlmodel.model';
import { MLModelsService } from '../services/mlmodel.service';
import { EnvironmentsService } from '../services/environments.service';
import { Environment } from '../models/environment.model';
import { FeatureSetsService } from '../services/featuresets.service';
import { FeatureSet } from '../models/featureSets.model';
import { PatientIDs } from '../models/patientIds.model';

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

  constructor(private mlModelsService: MLModelsService, private environmentsService: EnvironmentsService, private featureSetsService: FeatureSetsService) { }

  ngOnInit() {
    this.mlModelsService.getAll().subscribe(resp => {
      this.mlmodels = resp;
    });
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

  test() {
    var patientIds: PatientIDs = new PatientIDs();
    let stringArray = this.patient_ids.split(',');
    for(var i = 0; i < stringArray.length; i++) {
      patientIds.patient_ids.push(parseInt(stringArray[i]));
    }

    this.mlModelsService.predict(this.mlmodel.id, patientIds).subscribe(resp => {
      this.testStr = resp;
    }, err => {
      this.testStr = 'server error'
    });
  }

  initTest(mlmodel: MLModel) {
    this.patient_ids = this.testStr = null;
    this.setMlModel(mlmodel);
  }

}
