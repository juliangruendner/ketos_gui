import { Component, OnInit } from '@angular/core';
import { FeatureSetsService } from '../services/featuresets.service';
import { FeatureSet } from '../models/featureSets.model';
import { Feature } from '../models/features.model';
import { FeaturesService } from '../services/features.service';
import { FeatureIDs } from '../models/featureIds.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-feature-sets',
  templateUrl: './feature-sets.component.html',
  styleUrls: ['./feature-sets.component.scss']
})
export class FeatureSetsComponent implements OnInit {

  featureSets: FeatureSet[] = [];
  tmp_featureSet: FeatureSet = new FeatureSet();

  features: Feature[] = [];

  is_form_create: boolean;
  form_featureSet: FeatureSet = new FeatureSet();

  showFeatures: boolean = false;

  constructor(private featureSetsService: FeatureSetsService, private featuresService: FeaturesService) { }

  ngOnInit() {
    this.featureSetsService.getAll().subscribe(resp => {
      this.featureSets = resp;
    });
  }

  clearFormInput() {
    this.form_featureSet = new FeatureSet();
  }

  setFormInput(featureSet: FeatureSet) {
    this.tmp_featureSet = _.clone(featureSet);
    this.form_featureSet = _.clone(featureSet);
  }

  create() {
    this.featureSetsService.post(this.form_featureSet).subscribe(fs => {
      this.featureSets.push(fs);
    });
    this.clearFormInput();
  }

  edit() {
    this.featureSetsService.putSingle(this.form_featureSet.id, this.form_featureSet).subscribe(retFs => {
      this.featureSets[this.featureSets.findIndex(fs => retFs.id === fs.id)] = retFs;
    });
  }

  delete() {
    this.featureSetsService.delete(this.tmp_featureSet.id).subscribe(id => {
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

    this.featureSetsService.postFeatures(this.tmp_featureSet.id, assignIds).subscribe();
    this.featureSetsService.deleteFeatures(this.tmp_featureSet.id, deleteIds).subscribe();
  }

  getFeatures(featureSet: FeatureSet) {
    this.showFeatures = false;
    this.featuresService.getAll().subscribe(resp => {
      this.features = resp;

      this.featureSetsService.getFeaturesForFeatureSet(featureSet.id).subscribe(resp => {
        this.tmp_featureSet = resp;

        for(var i = 0; i < this.features.length; i++) {
          for(var j = 0; j < this.tmp_featureSet.features.length; j++) {
            if(this.features[i].id == this.tmp_featureSet.features[j].id) {
              this.features[i].checked = true;
            }
          }
        }

        this.showFeatures = true;
      });
    });
  }

}
