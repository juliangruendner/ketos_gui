import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { GettingStartedComponent } from './gettingstarted.component';

const routes: Routes = Route.withShell([
  { path: '', redirectTo: '/gettingstarted', pathMatch: 'full' },
  { path: 'gettingstarted', component: GettingStartedComponent, data: { title: extract('Getting Started') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class GettingStartedRoutingModule { }
