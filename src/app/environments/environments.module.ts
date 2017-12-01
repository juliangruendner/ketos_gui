import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnvironmentsComponent } from './environments.component';
import { EnvironmentsRoutingModule } from './environments-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';
import { CoreModule } from '../core/core.module';


@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    EnvironmentsRoutingModule,
    FormsModule,
    MomentModule,
    CoreModule
  ],
  declarations: [
    EnvironmentsComponent
  ]
})
export class EnvironmentsModule { }
