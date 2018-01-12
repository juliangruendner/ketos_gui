import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { AdminUserListRoutingModule } from './admin-user-list-routing.module'
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment/moment.module';
import { CoreModule } from '../core/core.module';
import { AdminUserListComponent } from './admin-user-list.component';

@NgModule({
    imports: [
      CommonModule,
      TranslateModule,
      AdminUserListRoutingModule,
      FormsModule,
      MomentModule,
      CoreModule
    ],
    declarations: [
      AdminUserListComponent
    ]
  })
export class AdminUserListModule { }
