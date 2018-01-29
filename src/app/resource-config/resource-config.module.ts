import { NgModule } from '@angular/core';
import { ResourceConfigRoutingModule } from './resource-config-routing.module';
import { ResourceConfigComponent } from './resource-config.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ResourceConfigRoutingModule,
  ],
  declarations: [ResourceConfigComponent]
})
export class ResourceConfigModule { }
