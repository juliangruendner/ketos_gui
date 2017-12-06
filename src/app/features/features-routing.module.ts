import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { FeaturesComponent } from './features.component';

const routes: Routes = Route.withShell([
  { path: 'features', component: FeaturesComponent, data: { title: extract('Features') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class FeaturesRoutingModule { }
