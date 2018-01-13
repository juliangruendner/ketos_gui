import { Component, OnInit } from '@angular/core';
import { FeatureSetsService } from '../services/featuresets.service';
import { FeatureSet } from '../models/featureSets.model';
import { Feature } from '../models/features.model';
import { FeaturesService } from '../services/features.service';
import { FeatureIDs } from '../models/featureIds.model';

@Component({
  selector: 'app-feature-sets',
  templateUrl: './feature-sets.component.html',
  styleUrls: ['./feature-sets.component.scss']
})
export class FeatureSetsComponent implements OnInit {

  featureSets: FeatureSet[] = [];
  featureSet: FeatureSet = new FeatureSet();

  features: Feature[] = [];

  is_form_create: boolean;
  form_name: string;
  form_description: string;

  showFeatures: boolean = false;

  constructor(private featureSetsService: FeatureSetsService, private featuresService: FeaturesService) { }

  ngOnInit() {
    this.featureSetsService.getAll().subscribe(resp => {
      this.featureSets = resp;
    });
  }

  clearFormInput() {
    this.form_name = this.form_description = null;
  }

  setFormInput(featureSet: FeatureSet) {
    this.featureSet = featureSet;
    this.form_name = featureSet.name;
    this.form_description = featureSet.description;
  }

  create() {
    let featureSet = new FeatureSet();
    featureSet.name = this.form_name;
    featureSet.description = this.form_description;
    this.featureSetsService.post(featureSet).subscribe(fs => { 
      this.featureSets.push(fs);
    });
    this.clearFormInput();
  }

  edit() {
    this.featureSet.name = this.form_name;
    this.featureSet.description = this.form_description;

    this.featureSetsService.putSingle(this.featureSet.id, this.featureSet).subscribe(retFs => {
      this.featureSets[this.featureSets.findIndex(fs => retFs.id === fs.id)] = retFs;
    });
  }

  delete() {
    this.featureSetsService.delete(this.featureSet.id).subscribe(id => {
      this.featureSets.splice(this.featureSets.findIndex(fs => id.id === fs.id), 1);
    });
  }

  assign() {
    let assignIds = new FeatureIDs();
    let deleteIds = new FeatureIDs();
    for(var i = 0; i < this.features.length; i++) {
      if(this.features[i].checked) {
        assignIds.feature_ids.push(this.features[i].id);
      } else {
        deleteIds.feature_ids.push(this.features[i].id);
      }
    }

    this.featureSetsService.postFeatures(this.featureSet.id, assignIds).subscribe();
    this.featureSetsService.deleteFeatures(this.featureSet.id, deleteIds).subscribe();
  }

  getFeatures(featureSet: FeatureSet) {
    this.showFeatures = false;
    this.featuresService.getAll().subscribe(resp => {
      this.features = resp;

      this.featureSetsService.getFeaturesForFeatureSet(featureSet.id).subscribe(resp => {
        this.featureSet = resp;

        for(var i = 0; i < this.features.length; i++) {
          for(var j = 0; j < this.featureSet.features.length; j++) {
            if(this.features[i].id == this.featureSet.features[j].id) {
              this.features[i].checked = true;
            }
          }
        }

        this.showFeatures = true;
      });
    });
  }

}
