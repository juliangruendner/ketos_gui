import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { Feature } from '../models/features.model';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  features: Feature[] = [];
  feature: Feature = new Feature();

  is_form_create: boolean;
  form_resource: string;
  form_parameter_name: string;
  form_value: string;
  form_name: string;
  form_description: string;

  constructor(private featuresService: FeaturesService) { }

  ngOnInit() {
    this.featuresService.getAll().subscribe(resp => {
      this.features = resp;
    });
  }

  clearFormInput() {
    this.form_resource = this.form_parameter_name = this.form_value = this.form_name = this.form_description = null;
  }

  setFormInput(feature: Feature) {
    this.feature = feature;
    this.form_resource = feature.resource;
    this.form_parameter_name = feature.parameter_name;
    this.form_value = feature.value;
    this.form_name = feature.name;
    this.form_description = feature.description;
  }

  create() {
    var feature = new Feature();
    feature.resource = this.form_resource;
    feature.parameter_name = this.form_parameter_name;
    feature.value = this.form_value;
    feature.name = this.form_name;
    feature.description = this.form_description;

    this.featuresService.post(feature).subscribe(f => {
      this.features.push(f);
    });
    this.clearFormInput();
  }

  edit() {
    this.feature.resource = this.form_resource;
    this.feature.parameter_name = this.form_parameter_name;
    this.feature.value = this.form_value;
    this.feature.name = this.form_name;
    this.feature.description = this.form_description;

    this.featuresService.putSingle(this.feature.id, this.feature).subscribe((retF) => {
      this.features[this.features.findIndex(f => retF.id === f.id)] = retF;
    });
  }

  delete() {
    this.featuresService.delete(this.feature.id).subscribe((id) => {
      this.features.splice(this.features.findIndex(feature => id.id === feature.id), 1);
    });
  }

}
