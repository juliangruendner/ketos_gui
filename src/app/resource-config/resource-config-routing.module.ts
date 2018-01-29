import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { ResourceConfigComponent } from './resource-config.component';

const routes: Routes = Route.withShell([
  { path: 'resource-config', component: ResourceConfigComponent, data: { title: extract('Fhir Resouce') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class ResourceConfigRoutingModule { }
