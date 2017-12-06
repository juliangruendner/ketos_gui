import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSetsComponent } from './feature-sets.component';
import { FormsModule } from '@angular/forms';
import { FeatureSetsRoutingModule } from './feature-sets-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FeatureSetsRoutingModule
  ],
  declarations: [FeatureSetsComponent]
})
export class FeatureSetsModule { }
