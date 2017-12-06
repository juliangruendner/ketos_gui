import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { FeatureSetsComponent } from './feature-sets.component';

const routes: Routes = Route.withShell([
  { path: 'feature-sets', component: FeatureSetsComponent, data: { title: extract('Feature Sets') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FeatureSetsRoutingModule { }
