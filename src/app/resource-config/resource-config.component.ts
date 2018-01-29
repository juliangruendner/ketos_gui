import { Component, OnInit } from '@angular/core';
import { ResourcesConfigService } from '../services/resourcesconfig.service';
import { ResourceConfig } from '../models/resourceConfig.model';

@Component({
  selector: 'app-resource-config',
  templateUrl: './resource-config.component.html',
  styleUrls: ['./resource-config.component.scss']
})
export class ResourceConfigComponent implements OnInit {

  resourceConfigs: ResourceConfig[] = [];

  constructor(private resourcesConfigService: ResourcesConfigService) { }

  ngOnInit() {
    this.resourcesConfigService.getAll().subscribe(resp => {
      this.resourceConfigs = resp;
    });

  }

}
