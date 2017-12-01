import { Component, OnInit } from '@angular/core';
import { EnvironmentsService } from '../services/environments.service';
import { finalize } from 'rxjs/operators';
import { Environment } from '../models/environment.model';
import { Image } from '../models/image.model';
import { ImagesService } from '../services/images.service';

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

  create_name: string;
  create_description: string;
  create_image_id: Number;

  constructor(private environmentsService: EnvironmentsService, private imagesService: ImagesService) { }

  ngOnInit() {
    this.environmentsService.getAll().subscribe(envs => { 
      this.envs = envs;
    });
  }

  getEnv(id: Number, name?: string) {
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

  openJupyter() {
    window.open('http://' + this.env.jupyter_url, "_blank");
  }

  start() {
    var e = Object.assign({}, this.env);
    e.status = 'running';
    this.putEnv(this.env.id, e);
    this.env.status = 'starting';
    this.addEnv(this.env);
  }

  stop() {
    var e = Object.assign({}, this.env);
    e.status = 'stopped';
    this.putEnv(this.env.id, e);
    this.env.status = 'stopping';
    this.addEnv(this.env);
  }

  putEnv(id: Number, env: any) {
    this.environmentsService.putSingle(id, env).subscribe(env => {
      if(env.id == this.env.id) {
        this.env = env;
      }
      this.addEnv(env);
    });
  }

  create() {
    var env = new Environment();
    env.name = this.create_name;
    env.description = this.create_description;
    env.image_id = this.create_image_id;
    this.environmentsService.post(env).subscribe(env => {
      this.addEnv(env);
      this.removeFromEnvsTmp(env);
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

  removeFromEnvs(id: Number) {
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
    this.environmentsService.delete(this.env.id).subscribe(id => {
      this.removeFromEnvs(id);
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

}
