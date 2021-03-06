import { Component, OnInit} from '@angular/core';
import { EnvironmentsService } from '../services/environments.service';
import { Environment } from '../models/environment.model';
import { Image } from '../models/image.model';
import { ImagesService } from '../services/images.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/timeInterval';
import { MLModel } from '../models/mlmodel.model';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss'],
})
export class EnvironmentsComponent implements OnInit {

  envs: Environment[] = [];
  envs_tmp: Environment[] = [];
  env: Environment = new Environment();

  images: Image[] = [];
  hide_alert: boolean = true

  create_name: string;
  create_description: string;
  create_image_id: number;

  constructor(private environmentsService: EnvironmentsService, private imagesService: ImagesService) { }

  ngOnInit() {
    this.environmentsService.getAll().subscribe(envs => { 
      this.envs = envs;
    });
  }

  getEnv(id: number, name?: string) {
    this.env = new Environment();
    if(name) {
      for(var i = 0; i < this.envs_tmp.length; i++) {
        if(this.envs_tmp[i].name == name) {
          this.env = this.envs_tmp[i];
          return;
        }
      }
    }

    for(var i = 0; i < this.envs.length; i++) {
      if(this.envs[i].id == id) {
        this.env = this.envs[i];
        return;
      }
    }
  }

  openJupyter(env : Environment) {
    window.open('https://' + env.jupyter_url, "_blank");
  }

  start() {

    if(environment.demo){
        this.hide_alert = false;
        return;
    }
    
    this.startProgress(this.env, 10);
    var e = Object.assign({}, this.env);
    e.status = 'running';
    this.putEnv(this.env.id, e);
    this.env.status = 'starting';
    this.addEnv(this.env);
  }

  stop() {
    if(environment.demo){
        this.hide_alert = false;
        return;
    }

    this.startProgress(this.env, 10);
    var e = Object.assign({}, this.env);
    e.status = 'stopped';
    this.putEnv(this.env.id, e);
    this.env.status = 'stopping';
    this.addEnv(this.env);
  }

  putEnv(id: number, env: Environment) {
    this.environmentsService.putSingle(id, env).subscribe(env => {
      if(env.id == this.env.id) {
        this.env = env;
      }
      this.addEnv(env);
      this.finishProgress(env);
    });
  }

  create() {

    if(environment.demo){
        this.hide_alert = false;
        return;
    }

    var env = new Environment();
    env.name = this.create_name;
    env.description = this.create_description;
    env.image_id = this.create_image_id;
    this.startProgress(env, 30);
    this.environmentsService.post(env).subscribe(env => { 
      this.finishProgress(this.env);
      this.addEnv(env);
      this.removeFromEnvsTmp(env);
      if(this.env.name == env.name) {
        this.env = env;
      }
    });
    env.status = 'starting';
    this.envs_tmp.push(env);

    this.clearCreateInput();
  }

  getAllEnvs() {
    return this.envs.concat(this.envs_tmp);
  }

  removeFromEnvsTmp(env: Environment) {
    var tmp : Environment[] = [];
    for(var i = 0; i < this.envs_tmp.length; i++) {
      if(this.envs_tmp[i].name == env.name) {
        continue;
      }
      tmp.push(this.envs_tmp[i]);
    }
    this.envs_tmp = tmp;
  }

  removeFromEnvs(id: number) {
    var tmp : Environment[] = [];
    for(var i = 0; i < this.envs.length; i++) {
      if(this.envs[i].id == id) {
        continue;
      }
      tmp.push(this.envs[i]);
    }
    this.envs = tmp;
  }

  addEnv(env: Environment) {
    for(var i = 0; i < this.envs.length; i++) {
      if(this.envs[i].id == env.id) {
        this.envs[i] = env;
        return;
      }
    }
    this.envs.push(env);
  }

  delete() {
    this.environmentsService.delete(this.env.id).subscribe(resp => {
      console.log(resp.id)
      this.removeFromEnvs(resp.id);
    });
    this.env = new Environment();
  }

  getImages() {
    this.imagesService.getAll().subscribe(images => {
      this.images = images;
    });
  }

  clearCreateInput() {
    this.create_name = this.create_description = this.create_image_id = null;
  }

  startProgress(env: Environment, maxTime: number){
    let timer = Observable.timer(0,1000).timeInterval().take(maxTime);
    env.progress=0;
    let interval = 90 / maxTime;
    timer.subscribe(t=> env.progress += interval);
  }

  finishProgress(env: Environment){
    env.progress = 100;
  }

  initCreate() {
    this.clearCreateInput();
    this.getImages();
  }

}
