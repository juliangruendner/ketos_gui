import { Component, OnInit } from '@angular/core';
import { EnvironmentsService } from '../services/environments.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  envs: any;
  env: any;

  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {
    this.environmentsService.getAll().subscribe(json => { 
      this.envs = json;
    });
  }

  getEnv(id: Number) {
    this.environmentsService.getSingleById(id).subscribe(json => {
      this.env = json;
    });
  }

  openJupyter() {
    window.open('http://' + this.env.jupyter_url, "_blank");
  }

  start() {
    this.env.status = 'running';
    this.putEnv();
  }

  stop() {
    this.env.status = 'stopped';
    this.putEnv();
  }

  putEnv() {
    this.environmentsService.putSingle(this.env).subscribe(json => {
      this.env = json;
    });
  }

}
