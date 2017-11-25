import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { EnvironmentsComponent } from './environments.component';

const routes: Routes = Route.withShell([
  { path: 'environments', component: EnvironmentsComponent, data: { title: extract('Environments') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class EnvironmentsRoutingModule { }
