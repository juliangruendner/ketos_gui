import { Component, OnInit } from '@angular/core';

import { CrawlersService } from '../services/crawlers.service';
import { Crawler } from '../models/crawlers';
import { PatientIDs } from '../models/patientIds.model';
import { DataRequest } from '../models/dataRequest';
import { FeatureSet } from '../models/featureSets.model';
import { FeatureSetsService } from '../services/featuresets.service';
import { FhirBaseService } from '../services/fhirbase.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss']
})
export class CrawlersComponent implements OnInit {

  crawlers: Crawler[] = [];
  server_url: string = environment.serverUrl;
  create_fhir_resource_name: string;
  create_patient_ids = 'test';
  create_featureset_id: number;
  isResourceObservation = true;

  assign_feature_set: number;
  featureSets: FeatureSet[] = [];

  fhirResources: string[];

  constructor(
    private crawlersService: CrawlersService,
    private featureSetsService: FeatureSetsService,
    private fhirBaseService: FhirBaseService) { }

  ngOnInit() {
    this.updateCrawlers();

    // TODO add to localstorage?
    this.fhirBaseService.getMetaData().subscribe(resp => {
      this.fhirResources = resp['rest'][0]['resource'].map((resource: any) => resource['type']);
    });
  }

  clearCreateInput() {
    this.create_patient_ids = this.create_featureset_id = this.create_fhir_resource_name = null;
  }

  updateCrawlers() {
    this.crawlersService.getAll().subscribe(resp => {
      this.crawlers = resp;
    });
  }

  initCreate() {
    this.clearCreateInput();
    this.updateCrawlers();
    this.clearAssignData();
    this.getFeatureSets();
  }

  create() {
    const feature_set_id = this.assign_feature_set;
    const stringArray = this.create_patient_ids.split(',');
    const resource_name = this.create_fhir_resource_name;

    const patient_ids: number[] = [];

    stringArray.forEach(element => {
      patient_ids.push(parseInt(element));
    });

    console.log(feature_set_id, patient_ids, resource_name);

    const dataRequest = new DataRequest();
    dataRequest.patient_ids = patient_ids;

    if (this.isResourceObservation) {
      dataRequest.feature_set_id = feature_set_id;
    } else {
      dataRequest.resource_name = resource_name;
    }

    console.log(dataRequest);

    this.crawlersService.create(dataRequest).subscribe(resp => {
      console.log(resp);
    }, err => {
      console.log('request failed');
    });

  }

  clearAssignData() {
    this.assign_feature_set = null;
  }

  getFeatureSets() {
    this.featureSetsService.getAll().subscribe(resp => {
      this.featureSets = resp;
    });
  }
}
