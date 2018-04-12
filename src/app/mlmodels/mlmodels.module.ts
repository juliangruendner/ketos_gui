import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MlmodelsComponent } from './mlmodels.component';
import { FormsModule } from '@angular/forms';
import { MLModelsRoutingModule } from './mlmodels-routing.module';
import { FileUploadModule } from 'ng2-file-upload';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MLModelsRoutingModule,
    FileUploadModule
  ],
  declarations: [MlmodelsComponent]
})
export class MlmodelsModule { }
