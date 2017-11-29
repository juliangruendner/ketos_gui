import { Component, OnInit } from '@angular/core';
import { EnvironmentsService } from '../services/environments.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-environments',
  templateUrl: './environments.component.html',
  styleUrls: ['./environments.component.scss']
})
export class EnvironmentsComponent implements OnInit {

  private envs : any;

  constructor(private environmentsService: EnvironmentsService) { }

  ngOnInit() {
    this.environmentsService.getAll().subscribe((json: object[]) => { 
      this.envs = json;
      console.log(json)
    });
  }

  getEnv() {
    return this.envs;
  }

  click(){
    
  }

}
