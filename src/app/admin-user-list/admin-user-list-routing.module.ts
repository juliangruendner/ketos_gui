import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route } from '../core/route.service';
import { extract } from '../core/i18n.service';
import { AdminUserListComponent } from './admin-user-list.component';

const routes: Routes = Route.withShell([
  { path: 'admin-user-list', component: AdminUserListComponent, data: { title: extract('User List') } }
]);

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminUserListRoutingModule { }
