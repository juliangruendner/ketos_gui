import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { MlmodelsComponent } from './mlmodels.component';

const routes: Routes = Route.withShell([
  { path: 'mlmodels', component: MlmodelsComponent, data: { title: extract('ML Models') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class MLModelsRoutingModule { }
