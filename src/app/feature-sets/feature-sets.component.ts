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

  features: Feature[] = []

  create_name: string;
  create_description: string;

  showFeatures: boolean = false;

  constructor(private featureSetsService: FeatureSetsService, private featuresService: FeaturesService) { }

  ngOnInit() {
    this.featureSetsService.getAll().subscribe(resp => {
      this.featureSets = resp;
    });
  }

  clearCreateInput() {
    this.create_name = this.create_description = null;
  }

  create() {
    var featureSet = new FeatureSet();
    featureSet.name = this.create_name;
    featureSet.description = this.create_description;
    this.featureSetsService.post(featureSet).subscribe(fs => { 
      this.featureSets.push(fs);
    });
    this.clearCreateInput();
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
