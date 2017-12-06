import { Component, OnInit } from '@angular/core';
import { FeatureSetsService } from '../services/featuresets.service';
import { FeatureSet } from '../models/featureSets.model';

@Component({
  selector: 'app-feature-sets',
  templateUrl: './feature-sets.component.html',
  styleUrls: ['./feature-sets.component.scss']
})
export class FeatureSetsComponent implements OnInit {

  featureSets: FeatureSet[] = [];

  create_name: string;
  create_description: string;

  constructor(private featureSetsService: FeatureSetsService) { }

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

}
