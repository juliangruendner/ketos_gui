import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { AnnotationsComponent } from './annotations.component';

const routes: Routes = Route.withShell([
  { path: 'annotations', component: AnnotationsComponent, data: { title: extract('Annotations') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AnnotationsRoutingModule { }
