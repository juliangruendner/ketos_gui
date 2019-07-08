import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { Feature } from '../models/features.model';
import * as _ from 'lodash';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  features: Feature[] = [];

  is_form_create: boolean;
  form_feature: Feature = new Feature();
  tmp_feature: Feature = new Feature();

  constructor(private featuresService: FeaturesService) { }

  ngOnInit() {
    this.featuresService.getAll().subscribe(resp => {
      this.features = resp;
    });
  }

  clearForm() {
    this.form_feature = new Feature();
  }

  setForm(feature: Feature) {
    this.tmp_feature = _.clone(feature);
    this.form_feature = _.clone(feature);
  }

  create() {

    if(this.form_feature.output_value_path == ''){
        this.form_feature.output_value_path = null
    }

    this.featuresService.post(this.form_feature).subscribe(f => {
      this.features.push(f);
    });
  }


  edit() {

    if(this.form_feature.output_value_path == ''){
        this.form_feature.output_value_path = null
    }

    this.featuresService.putSingle(this.form_feature.id, this.form_feature).subscribe((retF) => {
      this.features[this.features.findIndex(f => retF.id === f.id)] = retF;
    });
  }

  delete() {
    this.featuresService.delete(this.form_feature.id).subscribe((id) => {
      this.features.splice(this.features.findIndex(feature => id.id === feature.id), 1);
    });
  }

}
