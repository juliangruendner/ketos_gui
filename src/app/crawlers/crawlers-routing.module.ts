import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { CrawlersComponent } from './crawlers.component';

const routes: Routes = Route.withShell([
  { path: 'crawlers', component: CrawlersComponent, data: { title: extract('Crawlers') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CrawlersRoutingModule { }
