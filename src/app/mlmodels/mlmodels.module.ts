import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MlmodelsComponent } from './mlmodels.component';
import { FormsModule } from '@angular/forms';
import { MLModelsRoutingModule } from './mlmodels-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MLModelsRoutingModule
  ],
  declarations: [MlmodelsComponent]
})
export class MlmodelsModule { }
