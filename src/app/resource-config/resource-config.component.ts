import { Component, OnInit } from '@angular/core';
import { ResourcesConfigService } from '../services/resourcesconfig.service';
import { ResourceConfig } from '../models/resourceConfig.model';
import * as _ from 'lodash';
import { ResourceMapping } from '../models/resourceMapping.model';
import { FhirBaseService } from '../services/fhirbase.service';

@Component({
  selector: 'app-resource-config',
  templateUrl: './resource-config.component.html',
  styleUrls: ['./resource-config.component.scss']
})
export class ResourceConfigComponent implements OnInit {

  resourceConfigs: ResourceConfig[] = [];

  fhirResources: string[];

  is_form_create: boolean;
  form_config: ResourceConfig = new ResourceConfig();

  constructor(private resourcesConfigService: ResourcesConfigService, private fhirBaseService: FhirBaseService) { }

  ngOnInit() {
    this.resourcesConfigService.getAll().subscribe(resp => {
      this.resourceConfigs = resp;
    });

    // TODO add to localstorage?
    this.fhirBaseService.getMetaData().subscribe(resp => {
      this.fhirResources = resp['rest'][0]['resource'].map((resource: any) => resource['type']);
    });
  }

  clearForm() {
    this.form_config = new ResourceConfig();
    this.extendFormMapping(this.form_config);
  }

  setForm(resourceConfig: ResourceConfig) {
    this.form_config = _.cloneDeep(resourceConfig);
  }

  extendFormMapping(resourceConfig: ResourceConfig) {
    if (!Array.isArray(resourceConfig.resource_mapping)) {
      resourceConfig.resource_mapping = new Array();
    }

    resourceConfig.resource_mapping.push(new ResourceMapping());
  }

  removeEmptyMapping(resourceConfig: ResourceConfig) {
    resourceConfig.resource_mapping = resourceConfig.resource_mapping.filter(mapping => {
      return mapping.resource_path !== '' && mapping.result_path !== '';
    });
  }

  create() {
    this.removeEmptyMapping(this.form_config);

    this.resourcesConfigService.post(this.form_config).subscribe(resourceConfig => {
      this.resourceConfigs.push(resourceConfig);
    });
  }

  edit() {
    this.removeEmptyMapping(this.form_config);

    this.resourcesConfigService.post(this.form_config).subscribe((retResourceConfig) => {
      this.resourceConfigs[this.resourceConfigs.findIndex(
        config => retResourceConfig.resource_name === config.resource_name)] = retResourceConfig;
    });
  }

  delete() {
    this.resourcesConfigService.delete(this.form_config).subscribe((resourceName) => {
      this.resourceConfigs.splice(this.resourceConfigs.findIndex(resourceConfig => resourceName === resourceConfig.resource_name), 1);
    });
  }

}
