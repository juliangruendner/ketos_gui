import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AdminUserListRoutingModule } from './admin-user-list-routing.module'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { CoreModule } from '../core/core.module';
import { AdminUserListComponent } from './admin-user-list.component';
import { PipesModule } from '../pipes/pipes.module';

@NgModule({
    imports: [
      CommonModule,
      TranslateModule,
      AdminUserListRoutingModule,
      FormsModule,
      MomentModule,
      CoreModule,
      ReactiveFormsModule,
      PipesModule,
    ],
    declarations: [
      AdminUserListComponent,
    ],
  })
export class AdminUserListModule { }
