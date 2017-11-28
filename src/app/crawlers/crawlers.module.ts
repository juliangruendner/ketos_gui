import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrawlersComponent } from './crawlers.component';
import { CrawlersRoutingModule } from './crawlers-routing.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    TranslateModule,
    CrawlersRoutingModule
  ],
  declarations: [
    CrawlersComponent
  ]
})
export class CrawlersModule { }
