import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CohortsComponent } from './cohorts.component';
import { TranslateModule } from '@ngx-translate/core';
import { CohortsRoutingModule } from './cohorts-routing.module';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { CoreModule } from '../core/core.module';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CohortsRoutingModule,
    FormsModule,
    MomentModule,
    CoreModule
  ],
  declarations: [
    CohortsComponent
  ]
})
export class CohortsModule { }
