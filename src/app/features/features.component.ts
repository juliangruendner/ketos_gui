import { Component, OnInit } from '@angular/core';
import { FeaturesService } from '../services/features.service';
import { Feature } from '../models/features.model';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent implements OnInit {

  features: Feature[] = []

  create_resource: string;
  create_parameter_name: string;
  create_value: string;
  create_name: string;
  create_description: string;

  constructor(private featuresService: FeaturesService) { }

  ngOnInit() {
    this.featuresService.getAll().subscribe(resp => {
      this.features = resp;
    });
  }

  clearCreateInput() {
    this.create_resource = this.create_parameter_name = this.create_value = this.create_name = this.create_description = null;
  }

  create() {
    var feature = new Feature();
    feature.resource = this.create_resource;
    feature.parameter_name = this.create_parameter_name;
    feature.value = this.create_value;
    feature.name = this.create_name;
    feature.description = this.create_description;
    this.featuresService.post(feature).subscribe(f => { 
      this.features.push(f);
    });
    this.clearCreateInput();
  }

}
