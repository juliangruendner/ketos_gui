import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatureSetsComponent } from './feature-sets.component';
import { FormsModule } from '@angular/forms';
import { FeatureSetsRoutingModule } from './feature-sets-routing.module';
import { PipesModule } from '../pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    FeatureSetsRoutingModule,
    PipesModule,
  ],
  declarations: [
    FeatureSetsComponent,
  ],
})
export class FeatureSetsModule { }
