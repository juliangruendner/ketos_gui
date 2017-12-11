import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrawlersComponent } from './crawlers.component';
import { CrawlersRoutingModule } from './crawlers-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { MomentModule } from 'angular2-moment/moment.module';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CrawlersRoutingModule,
    MomentModule,
    Ng2OrderModule,
    FormsModule
  ],
  declarations: [
    CrawlersComponent
  ]
})
export class CrawlersModule { }
