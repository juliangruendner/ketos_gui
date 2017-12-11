import { Component, OnInit } from '@angular/core';

import { CrawlersService } from '../services/crawlers.service';
import { Crawler } from '../models/crawlers';
import { PatientIDs } from '../models/patientIds.model';
import { DataRequest } from '../models/dataRequest';

@Component({
  selector: 'app-crawlers',
  templateUrl: './crawlers.component.html',
  styleUrls: ['./crawlers.component.scss']
})
export class CrawlersComponent implements OnInit {

  crawlers: Crawler[] = [];

  create_patient_ids: string  = "test";
  create_featureset_id: number;

  constructor(private crawlersService : CrawlersService) { }

  ngOnInit() {
    this.updateCrawlers()
  }

  clearCreateInput() {
    this.create_patient_ids = this.create_featureset_id = null;
  }

  updateCrawlers() {
    this.crawlersService.getAll().subscribe(resp => {
      this.crawlers = resp;
    });
  }

  initCreate() {
    this.clearCreateInput();
    this.updateCrawlers();
  }

  create() {
    var feature_set_id = this.create_featureset_id
    let stringArray = this.create_patient_ids.split(',');
     
    var patient_ids: number[] = [];

    stringArray.forEach(element => {
      patient_ids.push(parseInt(element))
    });

    console.log(feature_set_id, patient_ids)

    var dataRequest = new DataRequest()
    dataRequest.feature_set_id = feature_set_id
    dataRequest.patient_ids = patient_ids

    this.crawlersService.create(feature_set_id, dataRequest).subscribe(resp => {
      console.log(resp)
    }, err => {
      console.log("request failed")
    });

  }

  
}
