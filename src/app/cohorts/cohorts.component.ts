import { Component, OnInit } from '@angular/core';
import { AtlasCohortsService } from '../services/atlasCohorts.service';

@Component({
  selector: 'app-cohorts',
  templateUrl: './cohorts.component.html',
  styleUrls: ['./cohorts.component.scss']
})
export class CohortsComponent implements OnInit {

  cohort_id: number;

  patient_ids: number[];

  constructor(private altasCohortService: AtlasCohortsService) { }

  ngOnInit() {
  }

  openAtlasCohorts() {
    window.open('http://localhost:8081/atlas/#/cohortdefinitions', "_blank");
  }

  getPatientIds() {
    this.altasCohortService.getSingleById(this.cohort_id).subscribe(cohort => {
      this.patient_ids = cohort.patient_ids;
    });
  }

}
