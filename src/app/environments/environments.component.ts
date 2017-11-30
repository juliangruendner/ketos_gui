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
    var e = Object.assign({}, this.env);
    e.status = 'running';
    this.putEnv(this.env.id, e);
  }

  stop() {
    var e = Object.assign({}, this.env);
    e.status = 'stopped';
    this.putEnv(this.env.id, e);
  }

  putEnv(id: Number, env: any) {
    this.environmentsService.putSingle(id, env).subscribe(json => {
      this.env = json;
    });
  }

}
