import { Component, OnInit } from '@angular/core';
import { ResourcesConfigService } from '../services/resourcesconfig.service';
import { ResourceConfig } from '../models/resourceConfig.model';
import * as _ from 'lodash';
import { FhirBaseService } from '../services/fhirbase.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-resource-config',
  templateUrl: './resource-config.component.html',
  styleUrls: ['./resource-config.component.scss']
})
export class ResourceConfigComponent implements OnInit {

  resourceConfigs: ResourceConfig[] = [];

  fhirResources: string[];
  hide_alert: boolean = false;
  demo: boolean = environment.demo;

  is_form_create: boolean;
  form_config: ResourceConfig = new ResourceConfig();

  constructor(private resourcesConfigService: ResourcesConfigService, private fhirBaseService: FhirBaseService) { }

  ngOnInit() {
    this.resourcesConfigService.getAll().subscribe(resp => {
      this.resourceConfigs = resp;
      console.log(this.resourceConfigs);
    });

    // TODO add to localstorage?
    this.fhirBaseService.getMetaData().subscribe(resp => {
      this.fhirResources = resp['rest'][0]['resource'].map((resource: any) => resource['type']);
    });
  }

  trackByIndex(index: number, value: string) {
    return index;
  }

  clearForm() {
    this.form_config = new ResourceConfig();
    this.extendSortPaths(this.form_config);
  }

  setForm(resourceConfig: ResourceConfig) {
    this.form_config = _.cloneDeep(resourceConfig);
  }

  extendSortPaths(resourceConfig: ResourceConfig) {
    if (!Array.isArray(resourceConfig.sort_order)) {
      resourceConfig.sort_order = new Array();
    }

    resourceConfig.sort_order.push('');
  }

  removeEmptySortPaths(resourceConfig: ResourceConfig) {
    if (!Array.isArray(resourceConfig.sort_order)) {
      resourceConfig.sort_order = new Array();
    }
    resourceConfig.sort_order = resourceConfig.sort_order.filter(sortOrder => {
      return sortOrder !== '';
    });
  }

  create() {
    this.removeEmptySortPaths(this.form_config);

    this.resourcesConfigService.post(this.form_config).subscribe(resourceConfig => {
      this.resourceConfigs.push(resourceConfig);
    });
  }

  edit() {
    this.removeEmptySortPaths(this.form_config);

    console.log(this.form_config)

    this.resourcesConfigService.post(this.form_config).subscribe((retResourceConfig) => {
      this.resourceConfigs[this.resourceConfigs.findIndex(
        config => retResourceConfig.resource_name === config.resource_name)] = retResourceConfig;
    });
  }

  delete() {
    this.removeEmptySortPaths(this.form_config);

    console.log(this.form_config)

    this.resourcesConfigService.delete(this.form_config).subscribe((retResourceConfig) => {
      this.resourceConfigs.splice(this.resourceConfigs.findIndex(resourceConfig => retResourceConfig.resource_name === resourceConfig.resource_name), 1);
    });
  }

}
