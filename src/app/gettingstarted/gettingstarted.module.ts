import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CoreModule } from '../core/core.module';
import { SharedModule } from '../shared/shared.module';
import { GettingStartedRoutingModule } from './gettingstarted-routing.module';
import { GettingStartedComponent } from './gettingstarted.component';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CoreModule,
    SharedModule,
    GettingStartedRoutingModule
  ],
  declarations: [
    GettingStartedComponent
  ],
})
export class GettingStartedModule { }
