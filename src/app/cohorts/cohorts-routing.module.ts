import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { CohortsComponent } from './cohorts.component';

const routes: Routes = Route.withShell([
  { path: 'cohorts', component: CohortsComponent, data: { title: extract('Atlas Cohorts') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CohortsRoutingModule { }
